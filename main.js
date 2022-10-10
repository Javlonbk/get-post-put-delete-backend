let arr = [];

// take pics
let piclocation = ""
function  getPic(val) {
    val.src = window.URL.createObjectURL(val.files[0])
    piclocation = val.src
    console.log(piclocation);

}

// get all users
let result = $('.result');

$('.all-user').on('click', () => {

  result.html('');
  $.ajax('https://reqres.in/api/users/', {

    type: 'GET',
    success: (res) => {
      console.log(res.data);

      res.data.map(obj => {
           arr.push(obj);
      })
      render(res.data)
    },


    error: (err) => {
      console.log(err);
    }
  })

})



// get one user

let id = $('.id_val').val();
$('.one-user').on('click', () => {
  result.html('');

  $.ajax(`https://reqres.in/api/users/${$('.id_val').val()}`, {

    type: 'GET',
    success: (res) => {
      let card = `
    <div class='card mt-4 col-3 mx-4'>
        <img src=${res.data.avatar} />
        <h3>${res.data.first_name} ${res.data.last_name} </h3>
        <p>${res.data.email}<p>  
    </div>
   
  `
      $('.result').append(card)
    },
    error: (err) => {
      console.log(err)
    }

  })

})

// get users delayed

$('.delay-info').on('click', () => {
  result.html('');
  $.ajax('https://reqres.in/api/users?delay=3', {

    type: 'GET',
    beforeSend: () => {
      $('.loading-icon').removeClass('d-none')
    },
    success: (res) => {
      console.log(res.data);
      render(res.data)
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      $('.loading-icon').addClass('d-none')
    }
  })

})




// add new User 

$("form").on("submit", function (event) {
  event.preventDefault()
  $.ajax($(this).attr("action"), {

    type: $(this).attr("method"),
    // data: $("form").serialize() ,
    data: {
      "avatar": piclocation,
      "name": $(".name").val(),
       "job": $(".job").val(),
       "email": $(".email").val(),
    },
    success: function (res) {
      console.log(res);
      let card = `
       <div class='card mt-4 col-3 mx-4'>
         <img src=${res.avatar} />
         <div><b>id: </b>${res.id}</h5>
         <div><b>name: </b>${res.name}</div>
         <div><b>job: </b>${res.job}</div>
         <div><b>email: </b>${res.email}<div>  
         <div><b>data: </b>${res.createdAt}</div>
       </div>
   ` 
     result.append(card);
    },
    error: function (err) {
      console.log(err)
    }

  })
})


//render infos

function render(data) {
  data.map(res => {
    let card = `
    <div class='card mt-4 col-3 mx-4'>
        <img src=${res.avatar} />
        <h3>${res.first_name} ${res.last_name} </h3>
        <p>${res.email}<p>  
    </div>
   
  `
    $('.result').append(card)
  })
}