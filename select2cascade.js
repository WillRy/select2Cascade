class Select2Cascade {
    constructor(parent, child, options) {
        this.parent = parent;
        this.child = child;
        this.options = options;
        this.options.text = this.options.text === undefined ? 'text' :  this.options.text;
        this.options.id = this.options.id === undefined ? 'id' :  this.options.id;
    }

    changeDisabled(value) {
        this.child.prop('disabled', value);
    }

    /**
     * Adiciona o evento de select
     * fazendo o Ajax para buscar os dados
     * */
    addSelectEvent() {
        this.parent.on('select2:select', () => {
            this.changeDisabled(true);
            let value = this.parent.val();
            if (value) {
                $.ajax({
                    url: this.options.url,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        search: value
                    }
                }).done((response) => {
                    if(this.options.callback){
                        this.options.callback();
                    }

                    //esvazia o select dependente
                    this.child
                        .empty()
                        .prepend('<option></option>')
                        .trigger('change');

                    response.results.forEach((value) => {
                        var persist = [];

                        // verifica se há valores persistidos
                        if (this.child.data('persist')) {
                            var persistValue = this.child.data('persist').toString().split(',');
                            persist = persistValue.length > 0 ? persistValue : [];
                        }

                        // preenche valores
                        this.child.append($('<option>', {
                            value: value[this.options.id],
                            text:  value[this.options.text],
                            selected: persist.includes(value[this.options.id].toString()) ? 'selected' : false
                        }));
                    });

                    this.child.trigger('change').trigger('select2:select');

                    this.changeDisabled(false);

                }).fail(function (error) {
                    console.log(error);
                })
            }
        })
    }

    /**
     * Verifica se há uma persitência no primeiro campo
     * disparando o select caso haja
     * */
    checkPersistedValue(){
        const persist = this.parent.data('persist');
        let values = [];

        // verifica se há valores persistidos
        if (persist) {
            const persistValue = persist.toString().split(',');
            values = persistValue.length > 0 ? persistValue : [];
            this.parent.val(values).trigger('change').trigger('select2:select');
        }
    }


    init() {
        if (this.parent && this.child && this.options) {
            this.changeDisabled(true);
            this.addSelectEvent();
            this.checkPersistedValue();
        }
        return this;
    }
}
window.Select2Cascade = Select2Cascade;
