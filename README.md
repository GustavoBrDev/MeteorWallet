![image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1KePpHcx0dsjZ2WGnUCXjhzfS9nNvZS5Lg&s)

# Meteor Wallet 

O projeto consiste na criação de uma carteira virtual utilizando os recursos do Meteor. Para isso foi seguido o curso [Meteor 101: The Fundamentals](https://university.meteor.com/course/meteor-101) disponiblizado gratuitamente no Meteor University. As funções implementadas foram:

* Criação de usuários
* Login de usuários
* Criação de carteiras
* Trasnferências
* Criação de contatos
* Rotas protegidas
* UserRoles

Pensando no projeto como um todo, não foram implementados (por escolha) os seguintes itens:

* PasswordLess
* Autenticação Externa (Google)

Segundo os teste realizados, a aplicação está em estado consíderavel para uso. Porém, apresenta alguns problemas que deveriam ser corrigidos.

## O Galaxy
![image](https://www.meteor.com/images/launch-week/cover-launch-day-one.png)

Foi realizado um deploy no serviço cloud da Galaxy. Porém, o mesmo não foi atuailizado, servindo apenas de conhecimento. Parte disto se deve ao fato de haver a necessidade de acessos diários para manter o servidor ativo.

> Houve problemas para sincronizar o Galaxy com o repositório Github e por isso não foi feito o deploy do projeto finalizado

## Problemas Enfrentados

Foram enfrentados alguns problemas durante a execução do projeto, sendo eles:

> **Login**: O login / cadastro não funciona em 100% dos casos por motivo desconhecido. Na minha opinião, está relacionado ao novo uso de funções assíncronas no servidor por parte do Meteor, cujo qual não estava presente no curso.

> **Tailwind**: Muitas das bibliotecas utilizadas para estilização foram atuailizadas diversas vezes, o que dificultou a execução do projeto. Para isso, foi necessário ler documentações das mesmas e em alguns casos utilizar outros itens.

> **useMemo**: Não foi possível adotar o hook do react devido a um problema de tipagem que impedia que o servidor fosse inicializado.

> **Email e userRoles**: Os pacotes de email e roles foram atulizados, necessitando assim de adaptações para funcionar.

## Minha Experiência

Como novo desenvolvedor de Javascript e também Meteor, vejo que a qualidade do curso, para um versão gratuita, é ótima. Porém, deveria ser atualizada o quanto antes. Reparo também que há uma grande difereça entre os "tutores" e eu optaria do primeiro módulo.

Acerca do Meteor, achei deveras interessante os recursos por ele ofertados e seu objetivo. Além disso, foi uma ótima oportunidade para compreender sobre o MongoDB. Creio que não adotarei o Meteor em outros projetos, mas não devido á alguma crítica ou problema e sim devido a projetos que não necessitam das funções do Meteor.

Por fim, agradeço a Deus e a Meteor Team pelo aprendizado ofertado de forma gratuita.
