function Presentation(title, desc){
  this.create = function(){
    $('#presentationContainer').append(_.template($('#presentationTemplate').html(), {"title": title, "description": desc}));
  };

  this.hide = function(){
    $('#addPresentationDialog').modal('hide');
  };

  this.clear = function(){
    $('#addPresentationDialog').bind('hidden', function() {
      $('#name').val('');
      $('#description').val('');
    });
  };
};

function Slide(counter){
  this.create = function(){
    $('.sldBox .slides').append(_.template($('#slideTemplate').html(), {'counter': counter}));
  };

  this.hide = function(){
    $('#addSlideDialog').modal('hide');
  };

  this.clear = function(){
    $("#markup").val('');
  };
};

var presentation_list = [];

$('#newPresentation').submit(function(e) {
  e.preventDefault();
  var presentation = new Presentation($("#name").val(), $("#description").val());
  presentation.create();
  presentation.hide();
  presentation.clear();
  presentation_list.push(presentation);
  console.log(presentation_list);
});

$("body").on('click', '#addSlideDialog .btn-primary', function(e) {
  e.preventDefault();
  var slide = new Slide($("#markup").val());
  slide.create();
  slide.hide();
  slide.clear();
});
