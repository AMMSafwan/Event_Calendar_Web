$(document).ready(function(){
    var calendar = $('#calendar').fullCalendar({
        header:{
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        displayEventTime: false,
        events: '/all_events',
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        select: function (start, end, allDay) {
            var title = prompt("Enter Event Title");
            if (title){
                var start = $.fullCalendar.formatDate(start, "Y-MM-DD");
                var end = $.fullCalendar.formatDate(end, "Y-MM-DD");
                $.ajax({
                    type:"GET",
                    url:'/add_event',
                    data:{'title': title, 'start': start, 'end': end},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        displayMessage("Event Created Successfully");
                        },
                        error: function (data){
                            alert('There is a problem!!!');
                        }
                });
            }
        },
        eventResize: function (event) {
            var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD");
            var end = $.fullCalendar.formatDate(event.Date, "Y-MM-DD");
            var title = event.title;
            var id = event.id;
            $.ajax({
                type: "GET",
                url: '/update',
                data: {'title':title, 'start':start, 'end':end, 'id':id},
                dataType: "json",
                success: function (data){
                    calendar.fullCalendar('refetchEvents');
                    displayMessage("Event Updated Successfully");
                },
                error: function (data) {
                    alert('There is a problem!!!');
                }
            });
        },
        eventDrop: function (event) {
            var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD");
            var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD");
            var title = event.title;
            var id = event.id;
            $.ajax({
                type: "GET",
                url: '/update',
                data: {'title':title, 'start':start, 'end':end, 'id':id},
                dataType: "json",
                success: function (data) {
                    calendar.fullCalendar('refetchEvents');
                    displayMessage("Event Updated Successfully");
                },
                error: function (data) {
                    alert('There is a problem!!!');
                }
            });
        },
        eventClick: function (event){
            if (confirm("Are you sure you want to remove it?")){
                var id = event.id;
                $.ajax({
                    type: "GET",
                    url: '/remove',
                    data: {'id':id},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        displayMessage("Event Delete Successfully");
                    },
                    error: function (data) {
                        alert('There is a problem!!!');
                    }
                });
            }
        },
    });
});

function displayMessage(message) {
    toastr.success(message, 'Event');
    }







