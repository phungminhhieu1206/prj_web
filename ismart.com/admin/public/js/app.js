// select-brand
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(() => {
    const temp = document.querySelectorAll('.select-parent-cat');
    if (temp === null) return;
    temp.forEach(element =>
        element.addEventListener('change', function () {
            var parent_cat = element.value;
            var data = { parent_cat: parent_cat };
            console.log(data);
            fetch('?mod=product&controller=product_cat&action=select_brand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).
                then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    document.querySelector('.select-brand').innerHTML = data;
                })
                .catch((xhr, ajaxoptions, thrownError) => {
                    alert(xhr.status);
                    alert.apply(thrownError);
                });
        }));
});
// select-type
ready(() => {
    const temp = document.querySelectorAll('.select-brand');
    if (temp === null) return;
    temp.forEach(element =>
        element.addEventListener('change', function () {
            var type = element.value;
            var data = { type: type };
            console.log(data);
            fetch('?mod=product&controller=product_cat&action=select_type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).
                then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    document.querySelector('.select-type').innerHTML = data;
                })
                .catch((xhr, ajaxoptions, thrownError) => {
                    alert(xhr.status);
                    alert.apply(thrownError);
                });
        }));
});