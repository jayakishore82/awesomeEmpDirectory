$(document).ready(function(){

//Function to handle the data received from https://randomuser.me.
  let showDirectory = function(data) {
      let empindex;
      let empItem = "";
//Loop through employee data and display details of employees in a grid.
      $.each(data.results, function(i,result){
        empItem += "<div class='item'>"
        empItem += "<div><img src='" + result.picture.large + "'></div>";
        empItem += "<div class='base-info'>";
        empItem += "<div class='name'>" + result.name.first + " " +  result.name.last  + "</div>";
        empItem += "<div class='email'>" + result.email  + "</div>";
        empItem += "<div class='city'>" + result.location.city + "</div></div>";
        empItem += "</div>";
      }); //end loop

      $('.grid').html(empItem);

  //Function to populate modal window with employee details
      function populateModal() {
        let employee = data.results[empindex];
        let cell = employee.cell.replace(/\D/g,'');
        let formattedCell = "(" + cell.substr(0,3) + ") " + cell.substr(3,3) + "-" + cell.substr(6,4);
        let address = employee.location.street + ", " + employee.location.state + " " + employee.location.postcode;
        let birthDay = "Birthday:" + employee.dob.substr(5,2)+ "/" + employee.dob.substr(8,2) + "/" + employee.dob.substr(2,2);
        let empDetail = "<div><img src='" + employee.picture.large + "'></div>";
        empDetail += "<div class='name'>" + employee.name.first + " " +  employee.name.last  + "</div>";
        empDetail += "<div class='email'>" + employee.email  + "</div>";
        empDetail += "<div class='city line'>" + employee.location.city + "</div>";
        empDetail += "<div class='cell'>" + formattedCell + "</div>";
        empDetail += "<div class='address'>" + address + "</div>";
        empDetail += "<div class='bday'>" + birthDay + "</div>";

        $('.empDetails').html(empDetail);
      }

  //Event Handler to display the modal window when an employee item is clicked.
      $('.item').click(function(){
        $('#myModal').css('display','block');
        empindex = $(this).index();
        populateModal();
      });

//Event Handler to close the modal window.
      $('.close').click(function(){
        $('#myModal').css('display','none');
      });

//Event Handler to display the next employee data
      $('.next').click(function(){
        if (empindex <11){
          empindex += 1;
          populateModal();
        }
      });

//Event Handler to display the previous employee data
      $('.previous').click(function(){
        if (empindex > 0){
          empindex -= 1;
          populateModal();
        }
      });

/*Search Functionality: On keyup loop through all the employees in the page and display
only matching employees.
*/
      $('#search').keyup(function(){
          let searchName = $('#search').val().toUpperCase();

          $('.item').each(function(index){
              let name = $(this).find('.name').text().toUpperCase();
              if (name.includes(searchName)){
                $(this).css('display', 'grid');
              }
              else{
                $(this).css('display', 'none');
              }
          }); //End loop

      }); //end Search

  }; //end showDirectory

//ajax request to https://randomuser.me to get 12 employees from countries US and GB.
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=US,GB',
    dataType: 'json',
    success: showDirectory
  });

}); //end ready
