CKEDITOR.plugins.add('pbckcode', {
    icons: 'pbckcode',
    lang : ['fr', 'en'],
    init: function(editor) {

        // load JS file
        var head    = document.getElementsByTagName('HEAD').item(0);
        var script  = document.createElement("script");
        script.type = "text/javascript";
        script.src  = CKEDITOR.plugins.getPath('pbckcode') + "dialogs/ace/ace.js";
        head.appendChild(script);

        // load SHighlighter class
        head        = document.getElementsByTagName('HEAD').item(0);
        script      = document.createElement("script");
        script.type = "text/javascript";
        script.src  = CKEDITOR.plugins.getPath('pbckcode') + "dialogs/PBSyntaxHighlighter.js";
        head.appendChild(script);

        // load CSS file
        var link   = document.createElement('link');
        link.rel   = 'stylesheet';
        link.type  = 'text/css';
        link.href  = CKEDITOR.plugins.getPath('pbckcode') + "dialogs/style.css";
        link.media = 'all';
        head.appendChild(link);

        // init a new id to the code element for ACE Editor
        editor.codeId = Math.random().toString(36).substring(3);

        // global file-types
        editor.config.pbckcode_filetypes = [
            ['HTML', 'html'], ['CSS', 'css'], ['PHP', 'php'], ['JS', 'javascript']
        ];

        // protect the pre/attribute
        var require = ['pre(prettyprint)', 'pre[data-pbcklang]'];
        var arr = editor.config.pbckcode_filetypes, i = 0, len = arr.length;
        for(; i < len; i++){
            require.push('pre(' + arr[i][1] + ')')
        }
        arr = i = len = null;

        editor.addCommand('pbckcodeCommand', new CKEDITOR.dialogCommand('pbckcodeDialog', {
            allowedContent : require,
            requiredContent : require
        }));

        editor.ui.addButton('pbckcode', {
            label   : editor.lang.pbckcode.addCode,
            command : 'pbckcodeCommand',
            toolbar : 'pbckcode'
        });

        if (editor.contextMenu) {
            editor.addMenuGroup('pbckcodeGroup');
            editor.addMenuItem('pbckcodeItem', {
                label   : editor.lang.pbckcode.editCode,
                icon    : this.path + "icons/pbckcode.png",
                command : 'pbckcodeCommand',
                group   : 'pbckcodeGroup'
            });

            editor.contextMenu.addListener( function(element) {
                if(element.getAscendant('pre', true)) {
                    return { pbckcodeItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }

        CKEDITOR.dialog.add('pbckcodeDialog', this.path + 'dialogs/pbckcode.js' );
    }
});