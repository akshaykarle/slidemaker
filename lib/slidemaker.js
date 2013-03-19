function Presentation(title, desc){
  this.create = function(){
    $('#presentationContainer').append(_.template($('#presentationTemplate').html(), {"title": title, "description": desc, "counter": next_counter}));
    next_counter += 1;
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
  this.add_slide= function(){
    var slide = new Slide($("#markup").val());
    slide.create();
    slide.hide();
    slide.clear();
  }
};

function Slide(markup){
  this.create = function(){
    $('#' + current_counter).append(_.template($('#slideTemplate').html(), {'counter': markup}));
  };

  this.hide = function(){
    $('#addSlideDialog').modal('hide');
  };

  this.clear = function(){
    $("#markup").val('');
  };
};

var next_counter = 0;
var current_counter = -1;
var presentation_list = [];

$('#newPresentation').submit(function(e) {
  e.preventDefault();
  var presentation = new Presentation($("#name").val(), $("#description").val());
  presentation.create();
  presentation.hide();
  presentation.clear();
  presentation_list.push(presentation);
});

$("body").on('submit', '#newSlide', function(e) {
  e.preventDefault();
  console.log(current_counter);
  presentation_list[current_counter].add_slide();
});

$('#presentationContainer').on('click', ".row .add-slide", function(e) {
  current_counter = this.dataset.counter;
});
