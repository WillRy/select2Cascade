# Select2 Dependentes/Cascata

Uma classe ES6 que abstrai a construção de select2 em efeito cascata, ou seja,
um select2 preencher o outro.

## Utilização

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Select2Cascade</title>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <style>
      .container {
        margin: 0 auto;
        max-width: 600px;
      }
      .form-group {
        margin: 15px 0;
      }
      select {
          width: 100%;
      }
      label{
          margin: 10px 0;
          display: block;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-group">
        <label for="provider_id">Fornecedor</label>
        <select name="provider_id" id="provider_id">
          <option></option>
          <option value="provider-1">Fornecedor 1</option>
          <option value="provider-2">Fornecedor 2</option>
          <option value="provider-3">Fornecedor 3</option>
        </select>
      </div>
      <div class="form-group">
        <label for="category_id">Categoria</label>
        <select name="category_id" id="category_id">
          <option></option>
        </select>
      </div>
      <div class="form-group">
        <label for="product_id">Produto</label>
        <select name="product_id" id="product_id">
          <option></option>
        </select>
      </div>
    </div>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
      integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
      crossorigin="anonymous"
    ></script>
    
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

    <script src="/select2cascade.js"></script>
    <script>
      $(document).ready(function () {
        $('#provider_id').select2({
          placeholder: 'Escolha...',
        });
        $('#category_id').select2({
          placeholder: 'Escolha...',
        });
        $('#product_id').select2({
          placeholder: 'Escolha...',
        });

        const selectProvider = new Select2Cascade(
            $('#provider_id'),  //select "PAI"
            $('#category_id'),  //select "FILHO"
            {
                url: '/categories.json', // URL do AJAX
                id: 'text', // qual campo vindo do ajax vai ir para o value do option
                value: 'text', // qual campo vai ser usado como texto no option
                // callback é a função que será executada toda vez que um valor 
                // for selecionado
                callback: () => {
                    $('#product_id').empty().prepend('<option></option>').trigger('change');
                },
            }
        );
        selectProvider.init();

        const selectCategory = new Select2Cascade(
            $('#category_id'), 
            $('#product_id'), 
            {
                url: '/products.json',
                id: 'text', // qual campo vindo do ajax vai ir para o value do option
                value: 'text', // qual campo vai ser usado como texto no option
                callback: () => {},
            }
        );
        selectCategory.init();
      });
    </script>
  </body>
</html>
```

## Executar exemplo

Para testar o exemplo, clone o repositório e execute um servidor local para 
que o AJAX funcione.

URL: [url do server]:8000/index.html

Exemplo de server local com PHP:

```shell
php -S localhost:8000
```
> Também é possível fazer o mesmo com outras linguagens