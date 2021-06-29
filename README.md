# Processamento Gráfico

Trabalho desenvolvido na disciplina de Processamento Gráfico da UFSCar Sorocaba. Discentes Envolvidos:
<p>620343	Bernardo Pinheiro Camargo</p>
<p>743530	Felipe Augusto Vale Amorim</p>
<p>727297	Gustavo Gabriel Padilha de Oliveira</p>
<p>743553	João Victor Montefusco</p>
<p>746044	Renata Praisler</p>
<br>
Como executar: para rodar o projeto é necessário ter um web service, como por exemplo o XAMPP ou pode seguir os passos para utilizar o five-server:

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
<br>
Para realizar a fase 1 do projeto, dividimos nosso grupo em 5, onde cada membro ficou responsável por uma função, enquanto na fase 2, dividimos em 3 grupos (Gustavo, João e Renata, Felipe e Bernardo), onde também cada um recebeu uma funcionalidade a ser implementada, porém usando o Pair Programming.
<br><br>
Nesse trabalho possuimos objetos 3D em que aplicamos algumas técnicas de PG e temos botões que ajudam o usuário a explorar a cena, essas instruções ficam no canto esquerdo da tela.

![image](https://user-images.githubusercontent.com/42523994/123520580-bcb77200-d687-11eb-932b-1ee1119b52c9.png)


Com os Objetos _hulk-abomination_ e _doctor_octopus_ conseguimos controlar o posicionamento  desses objeto no ambiente virtual com os controles de: Mover para trás e mover para frente; conseguimos tambem alterar redimensionamento, com os controles de: aumentar tamanho e diminuir tamanho, essas alterações são feitas de maneira idenpendente e você pode trocar o objeto que sofrerá essa alteração com a tecla T. 

Dentro das opções de controle existe as técnicas de definição de câmera e projeção, e podemos ver a cena de 4 câmeras diferentes, isso pemite a visão do objeto por diversos ângulos diferente. 

![camera1](https://user-images.githubusercontent.com/42523994/123521862-b3320800-d68f-11eb-8f83-7fd1585ee26b.png)
_Camera01_

![camera2](https://user-images.githubusercontent.com/42523994/123521864-b6c58f00-d68f-11eb-8e64-768bcaa71a1e.png)
_Camera02_

![camera3](https://user-images.githubusercontent.com/42523994/123521872-ba591600-d68f-11eb-9e0d-1fef8b069b91.png)
_Camera03_

![camera4](https://user-images.githubusercontent.com/42523994/123521873-bc22d980-d68f-11eb-9b55-c0bb72ece89f.png)
_Camera04_


Com o objeto _iron-man_ temos a possibilidade de rasterização com a cor sólida preta apertando a letra R. 

Nos objetos _cubo_ e _esfera_ utilizamos a tecnicas de ponto de luz e tonalização de phong, respectivamente.

Com esse desenvolvimento conseguimos aplicar as explicações teóricas das aulas ministradas pelo Professor Dr. Mário Lizier no projeto pp3 e pp4.


