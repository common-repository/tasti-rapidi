(function($){
    //Apri la finestra di aiuto
    Mousetrap.bind('?', function() { 
        $('#tastirapidi').slideToggle('fast');
    });

    //Chiudi la finestra di aiuto
    Mousetrap.bind('esc', function() { 
        $('#tastirapidi').slideUp('fast');
    });

    //Attiva il debug-bar
    Mousetrap.bind('d', function() {
        if(typeof wpDebugBar != 'undefined') {
            wpDebugBar.toggle.visibility();
        }
    });

    //Ricarica la pagina corrente
    Mousetrap.bind('r', function() { location.reload();});

    Mousetrap.bind('v h', function() { _vai_verso(tastirapidi.home);}); //pagina homepage
    Mousetrap.bind('v l', function() { _vai_verso(tastirapidi.login);}); //pagina login
    Mousetrap.bind('v d', function() { _vai_verso(tastirapidi.dashboard);}); //dashboard
    Mousetrap.bind('v c', function() { _vai_verso(tastirapidi.edit_comments);}); //commenti
    Mousetrap.bind('v t', function() { _vai_verso(tastirapidi.themes);}); //pagina temi
    Mousetrap.bind('v p', function() { _vai_verso(tastirapidi.plugins);}); //pagina plugins
    Mousetrap.bind('v u', function() { _vai_verso(tastirapidi.users);}); //pagina utenti
    Mousetrap.bind('v i', function() { _vai_verso(tastirapidi.settings);}); //pagina impostazioni

    Mousetrap.bind('v a', function() { _vai_verso(tastirapidi.post_all);}); //tutti gli articoli
    Mousetrap.bind('v n', function() { _vai_verso(tastirapidi.post_new);}); //nuovo articolo
    Mousetrap.bind('V p', function() { _vai_verso(tastirapidi.page_all);}); //tutte le pagine
    Mousetrap.bind('V n', function() { _vai_verso(tastirapidi.page_new);}); //nuova pagina

    //modifica pagina o articolo in frontend
    Mousetrap.bind('m', function() {
        if(tastirapidi.edit_link == null ) {
            alert('Non puoi modificare qui');
            return false;
        } else {
            _vai_verso(tastirapidi.edit_link);
        }
    });

    /**
     * Reinderizza all'url
     * 
     * @param reinderizza url
     */
    function _vai_verso(url) {
        location.href = url;
    }

})(jQuery);

    /**
     * Comando completo della combinazione CTRL+s salvataggio rapido
     */
(function($, undefined) {
    'use strict';
    var $Document = $(document),
        $SaveButton,
        doingClick = false,
        tooltipText,
        shortcutForEditor,
        isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

    /**
      * Inizializza su documento pronto. Controlla il DOM per vedere quale pulsante possiamo usare:
      * - articolo / pagina / personalizza
      * - commenti
      * - editor del tema
      * - editor plugin
      * - profilo
      */
    $(function() {
        var $Body = $(document.body),
            $Status = $('#original_post_status'),
            sStatus = $Status.val();

        var shortcut = 'Ctrl+S';
        shortcutForEditor = 'ctrl+s';

        if (isMacLike) {
            shortcut = 'Cmd(⌘)+S';
            shortcutForEditor = 'meta+s';
        }

        if (window.SaveKeyboard && SaveKeyboard.tooltipText) {
            tooltipText = SaveKeyboard.tooltipText.replace('$SHORTCUT$', shortcut);
        } else {
            tooltipText = 'Premi ' + shortcut + ' per salvare';
        }

        if ($Status.length) {
            setButton(sStatus === 'publish' ? '#publish' : '#save-post');
        } else if ($Body.hasClass('link-php') || $Body.hasClass('link-add-php')) {
            setButton('#publish');
        } else if ($Body.hasClass('comment-php') || $Body.hasClass('wp-customizer')) {
            setButton('#save');
        } else if ($Body.hasClass('nav-menus-php')) {
            setButton('#save_menu_header');
        }  else if ($('#submit').length > 0) {
            setButton('#submit')
        }
    });



    /**
     * Tenta di impostare la variabile $SaveButton. Se il selettore è valido, viene aggiunto in lista ad eventi in keydown, altrimenti viene rimosso.
     * @param selettore
     */
    function setButton(selector) {
        removeTooltip($SaveButton);

        $SaveButton = $(selector);
        var isButton = $SaveButton.length === 1;

        if (isButton && $SaveButton.is(":visible")) {
            $Document.on('keydown', handleKeydown);
            $Document.on('keyup', handleKeyup);

            addTooltip($SaveButton);

            $(document).on('tinymce-editor-init', function(event, editor) {
                editor.addShortcut(shortcutForEditor, tooltipText, doClick);
            });
        } else {
            $SaveButton = undefined;
            $Document.off('keydown', handleKeydown);
            $Document.off('keyup', handleKeyup);
        }

        console.log('Button', $SaveButton !== undefined, $SaveButton); // log
    }

    /**
     * Handles evento effettivo del keydown.
     * @param e
     */
    function handleKeydown(e) {
        var modifierKeyPressed = (e.ctrlKey && !isMacLike) || (e.metaKey && isMacLike);

        if (modifierKeyPressed && (e.keyCode || e.which) === 83) {
            doClick();
            
            e.preventDefault();
        }
    }

    /**
     * Eventuale finto click.
     */
    function doClick() {
        if (doingClick) {
            return;
        }

        doingClick = true;

        if ($SaveButton && $SaveButton.is(':visible')) {
            $SaveButton.click();
        } else {
            console.log('Tasto non avviabile/visibile');
        }
    }

    /**
     * Handles evento effettivo del keyup.
     * @param e
     */
    function handleKeyup(e) {
        if (doingClick === true) {
            doingClick = false;
        }
    }

    /**
     * Aggiunge la descrizione del comando scorciatoia sul pulsante.
     */
    function addTooltip($Button) {
        var buttonTitle = $Button.attr('title');

        if (buttonTitle && buttonTitle != tooltipText) {
            buttonTitle += ' - ';
        } else {
            buttonTitle = '';
        }

        buttonTitle += tooltipText;

        $Button.attr('title', buttonTitle);
    }

    /**
     * Rimuove la descrizione comando scorciatoia sul pulsante.
     */
    function removeTooltip($Button) {
        if ($Button) {
            var cleanedTitle = '';

            if ($Button.attr('title') !== tooltipText) {
                cleanedTitle = $Button.attr('title').replace(' - ' + tooltipText, '');
            }

            $Button.attr('title', cleanedTitle);
        }
    }
})(jQuery);