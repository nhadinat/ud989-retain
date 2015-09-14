$(function(){

    var model = {
        // If nothing stored, make locally stored notes array
        // JSON.stringify({});            // '{}'
        // JSON.stringify(true);          // 'true'
        // JSON.parse('{}');              // {}
        // JSON.parse('true');            // true
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        // Add into the local stored notes
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        // Manifest
        getAllNotes: function() {
            //console.log(localStorage); // "[{"content":"cat"},{"content":"bat"},{"content":...
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        // Stores new note in model, then renders
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },
        // Gathers all notes in the model
        getNotes: function() {
            return model.getAllNotes().reverse();
        },
        // Starts the thing
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        // This is the global object
        init: function() {
            console.log(this);
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                // On submission, add new note from input value
                octopus.addNewNote(newNoteContent.val());
                // Clean input field
                newNoteContent.val('');
                // Prevent the usual from happening...??
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            // Render all the things
            octopus.getNotes().forEach(function(note){
                // += adds content to the string var
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});