// num product in cart DONE 
function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  ready(() => {
    var temp = document.querySelectorAll('.num-order');
    if (temp === null) return;
    temp.forEach(element =>
      element.addEventListener('change', function () {
        var product_id = element.getAttribute('data-id');
        var qty = element ? element.value : "";
        var data = { product_id: product_id, qty: qty };
        console.log(data);
        fetch('?mod=cart&controller=index&action=update_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `product_id=${product_id}&qty=${qty}`
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            console.log(response);
            return response;
          })
          .then(function (response) { return response.json() })
          .then(function (data) {
            document.querySelector('#sub-total-' + product_id).textContent = data.sub_total;
            document.querySelector('#total-price span').textContent = data.total;
          })
          .catch((xhr, ajaxoptions, thrownError, data) => {
            console.log("Lỗi CMNR");
          });
      }));
  });
  //list product khi ấn Product ở menu góc trên cùng bên phải DONE
  function get_data(event) {
    var cat_id = event.getAttribute('cat-id');
    var page_num = event.textContent;
    const arrange = document.querySelector('#filter-arrange option:checked').value;
    var data = { page_num: page_num, cat_id: cat_id, arrange: arrange };
    //console.log(data);
    fetch('?mod=product&controller=index&action=product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `page_num=${page_num}&cat_id=${cat_id}&arrange=${arrange}`,
    }).
      then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(cat_id).innerHTML = data.output;
      });
  };
  
  
  // pagination cat
  
  // ready(() => { 
  //   function fetch_data(page_num) {
  //       function get_filter(class_name) {
  //         var filter = [];
  //         const temp = document.querySelectorAll('.' + class_name + ':checked');
  //         for (var i=0 ; i<temp.length ; i++){
  //           var t = temp?temp.value:"";
  //           filter.push(t);
  //         }
  //       }
  //       var price = get_filter('filter-price'); 
  //       var brand = get_filter('filter-brand'); 
  //       var cat_id = document.querySelector('h3#cat-title').getAttribute('cat-id');
  //       const arrange = document.querySelector('#filter-arrange');
  //       arrange = arrange.querySelector(':selected').value;
  //       var data = {page_num: page_num, cat_id: cat_id, price: price, brand: brand, arrange: arrange };
  //       console.log(data);
  //       fetch('?mod=product&controller=index&action=pagination_cat', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded',
  //           },
  //           body: `page_num=${page_num}&cat_id=${cat_id}&price=${price}&brand=${brand}&arrange=${arrange}`,
  //         }).
  //           then((response) => {
  //           if (!response.ok) {
  //             throw Error(response.statusText);
  //           }
  //           return response;
  //         })
  //         .then((response) => response.json())
  //         .then((data)querySelector('#result-product-cat').innerHTML = data.output;
  //             document => {
  //             document.querySelector('span#num-page').textContent = data.num_page;
  //             document.querySelector('#num-filter').textContent = data.num_filter;
  //         })
  //         .catch((xhr, ajaxoptions, thrownError) => {
  //             alert(xhr.status);
  //             alert.apply(thrownError);
  //         });
  //   }
  //   // ferch_data();
  //   const temp = document.querySelector('.common_selector');
  //   if (temp === null) return;
  //   temp.addEventListener("click",function(){
  //       var page_num = document.textContent;
  //       fetch_data(page_num);
  //   });
  // });
  
    function get_data_cat(event) {
  
      function get_filter(class_name) {
  
        var filter = [];
        var temp = document.getElementsByClassName(class_name);
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].checked) filter.push(temp[i].value);
        };
        return filter;
      }
      var price = get_filter('filter-price');
      var brand = get_filter('filter-brand');
      var page_num = event.textContent;
      var cat_id = document.getElementById('cat-title').getAttribute('cat-id');
      var arrange = document.getElementById('filter-arrange').value;
      var data = { page_num: page_num, cat_id: cat_id, price: price, brand: brand, arrange: arrange };
      //console.log(data);
      console.log(window.location.pathname);
      // $.ajax({
      //   url: '?mod=product&controller=index&action=pagination_cat',
      //   method: 'POST',
      //   data: data,
      //   dataType: 'json',
      //   success: function (data) {
      //     document.getElementById('result-product-cat').innerHTML = data.output;
      //     document.getElementById('num-page').textContent = data.num_page;
      //     document.getElementById('num-filter').textContent = data.num_filter;
      //   },
      //   error: function (xhr, ajaxoptions, thrownError) {
      //     alert(xhr.status);
      //     alert(thrownError);
      //   }
      // });
      fetch('?mod=product&controller=index&action=pagination_cat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `page_num=${page_num}&cat_id=${cat_id}&price=${price}&brand=${brand}&arrange=${arrange}`,
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          console.log(response);
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById('result-product-cat').innerHTML = data.output;
          document.getElementById('num-page').textContent = data.num_page;
          document.getElementById('num-filter').textContent = data.num_filter;
        })
        .catch((xhr,ajaxoptions,thrownError) => {
          console.log("ERROR: "+thrownError+", "+xhr.status);
        });
      //   $(document).on("click", ".common_selector", function () {
      //     var page_num = $(this).text();
      //     ferch_data(page_num);
      // });
    }
  
  // pagination post NOT DONE
  // ready(() => { 
  //     function get_data(page_num){
  //         var data = {page_num: page_num};
  //         console.log(data);
  //         fetch('?mod=blog&controller=index&action=pagination_post', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/x-www-form-urlencoded',
  //             },
  //             body: `page_num=${page_num}`,
  //           }).
  //             then((response) => {
  //             if (!response.ok) {
  //               throw Error(response.statusText);
  //             }
  //             return response;
  //           })
  //           .then((response) => response.json())
  //           .then((data) => {
  //                 document.querySelector('#result_post').innerHTML = data.result_post;
  //           })
  //           .catch((xhr, ajaxoptions, thrownError) => {
  //               alert(xhr.status);
  //               alert.apply(thrownError);
  //           });
  //     };
  //     const temp = document.querySelector('.common_selector_post');
  //     if (temp === null) return;
  //     temp.addEventListener("click",function(){
  //         var page_num = document.textContent;
  //         get_data(page_num);
  //     });
  // });
  $(document).ready(function () {
    function get_data(page_num) {
      var data = { page_num: page_num };
      console.log(data);
      fetch('?mod=blog&controller=index&action=pagination_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `page_num=${page_num}`
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          console.log(response);
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById('result_post').innerHTML = data.result_post;
        })
        .catch((xhr, ajaxoptions, thrownError) => {
          console.log("ERROR: " + thrownError + ", " + xhr.status);
        });
    };
    $(document).on("click", ".common_selector_post", function () {
      var page_num = $(this).text();
      get_data(page_num);
    });
  });
  
  
  // pagination search NOT DONE
  // ready(() => { 
  //     function get_data(page_num, cat_id, value){
  //         const arrange = document.querySelector("#filter-arrange");
  //         arrange = arrange.querySelector(":selected");
  //         arrange = arrange?arrange.value:"";
  //         var data = {page_num: page_num, cat_id: cat_id, value: value, arrange: arrange};
  //         console.log(data);
  //         fetch('?mod=home&controller=index&action=pagination_search', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(data),
  //           }).
  //             then((response) => {
  //             if (!response.ok) {
  //               throw Error(response.statusText);
  //             }
  //             return response;
  //           })
  //           .then((response) => response.json())
  //           .then((data) => {
  //                 document.querySelector('#'+cat_id).innerHTML = data.result_search;
  //           })
  //           .catch((xhr, ajaxoptions, thrownError) => {
  //               alert(xhr.status);
  //               alert.apply(thrownError);
  //           });
  //     };
  //     const temp = document.querySelector('.common_selector_search');
  //     if (temp === null) return;
  //     temp.addEventListener("click",function(){
  //         var cat_id = document.getAttribute('cat-id');
  //         var page_num = document.textContent;
  //         var value = document.getAttribute('value');
  //         get_data(page_num,cat_id,value);
  //     });
  // });
  $(document).ready(function () {
    function get_data(page_num, cat_id, value) {
      var arrange = $("#filter-arrange").find(":selected").val();
      var data = { page_num: page_num, cat_id: cat_id, value: value, arrange: arrange };
      console.log(data);
      $.ajax({
        url: '?mod=home&controller=index&action=pagination_search',
        method: 'POST',
        data: data,
        dataType: 'json',
        success: function (data) {
          $('#' + cat_id).html(data.result_search);
        },
        error: function (xhr, ajaxoptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
      });
    };
    $(document).on("click", ".common_selector_search", function () {
      var cat_id = $(this).attr('cat-id');
      var page_num = $(this).text();
      var value = $(this).attr('value');
      get_data(page_num, cat_id, value);
    });
  });
  // LOADDING PAGE
  $(window).on('load', function (event) {
    $('.loader').fadeOut('slow');
  });
  // LOADDING PAGE
  // window.addEventListener('load',function(){
  //   const temp = document.querySelector('.loader');
  //   if (temp ===null) return;
  //   temp.classList.add('hide');
  //   temp.classList.remove('show');
  // });
  //================
  // SELECT ADDRESS
  //================
  
  //  select district NOT DONE
  // ready(() => {
  //   const temp = document.querySelector('.province');
  //   if (temp === null) return;
  //     temp.addEventListener('change',function(){
  //         var province = temp.querySelector(":selected");
  //         province = province?province.value:"";
  //         var data = {province: province};
  //         console.log(data);
  //         fetch('?mod=cart&action=select_district', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(data),
  //           }).
  //             then((response) => {
  //             if (!response.ok) {
  //               throw Error(response.statusText);
  //             }
  //             return response;
  //           })
  //           .then((response) => response.json())
  //           .then((data) => {
  //                 document.querySelector('.district').innerHTML = data;
  //           })
  //           .catch((xhr, ajaxoptions, thrownError) => {
  //               alert(xhr.status);
  //               alert.apply(thrownError);
  //           });
  //     });
  // });
  $(document).ready(function () {
    $('.province').change(function () {
      var province = $(this).find(":selected").val();
      var data = { province: province };
      console.log(data);
      $.ajax({
        url: '?mod=cart&action=select_district',
        method: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
          $('.district').html(data);
        },
        error: function (xhr, ajaxoptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
      });
    });
  });
  
  //  select commune NOT DONE
  // ready(() => {
  //     const temp =  document.querySelector('.district');
  //     if (temp===null) return;
  //     temp.addEventListener('change',function(){
  //         var district = temp.querySelector(":selected");
  //         district = district?district.value:"";
  //         var data = {district: district};
  //         console.log(data);
  //         fetch('?mod=cart&action=select_commune', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(data),
  //           }).
  //             then((response) => {
  //             if (!response.ok) {
  //               throw Error(response.statusText);
  //             }
  //             return response;
  //           })
  //           .then((response) => response.json())
  //           .then((data) => {
  //                 document.querySelector('.commune').innerHTML = data;
  //           })
  //           .catch((xhr, ajaxoptions, thrownError) => {
  //               alert(xhr.status);
  //               alert.apply(thrownError);
  //           });
  //     });
  // });
  $(document).ready(function () {
    $('.district').change(function () {
      var district = $(this).find(":selected").val();
      var data = { district: district };
      console.log(data);
      $.ajax({
        url: '?mod=cart&action=select_commune',
        method: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
          $('.commune').html(data);
        },
        error: function (xhr, ajaxoptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        },
      });
    });
  });