# PP3 - Processamento Gráfico

Como executar: para rodar o projeto é necessário ter um web service, como por exemplo o XAMPP ou pode seguir os passos para utilziar o five-server.

1. Faca o clone do repositorio
2. Instale o [five-server](#https://www.npmjs.com/package/five-server)
   ```sh
   $ npm -g i five-server
   ```
3. Navegue para a raiz do projeto e inicialize o servidor
   ```sh
   $ five-server . -p 8000
   ```
4. A aplicação ira abrir automaticamente no seu navegador.
5. Para a rasterização funcionar, mude o base_url na linha 152 do arquivo /assets/js/scripts.js para a url do projeto no seu servidor WEB
