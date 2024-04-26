# Relatório de escolhas e possíveis melhorias

As ferramentas escolhidas foram feitas com os frameworks mais básicos de cada um o React foi rodado usando o modelo sem outro framework e os comandos básicos do CodeIgniter, pois configurações mais avançadas estavam apresentando problemas mais complexos para resolver.

Os caminhos do backend foram testados utlizando a ferramenta postman e foi colocado um arquivo json com os testes realizados dentro da pasta backend\postman_routes_test, os testes do backend mostraram que as rotas estavam funcionando normalmente.
Durante os testes do frontend as chamadas de POST,PUT E DELETE tiveram problemas devido Cross-Origin Resource Sharing (CORS), mesmo tendo colocado as chamadas para liberar o acesso no header das chamadas. Esse problema pode não ocorrer em todos os navegadore, mas caso ocorra, para fins de teste, é possível no windows dar comando Windows-R e depois em executar colar esse comando chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security, ele irá desabilitar as configurações de segurança e o problema de CORS não irá mais ocorrer.

## Melhorias futuras:
Não foi possível implementar a chamada para alterar uma foto cadastrada do usuário, para que isso não interfirisse no resto do projeto foi criado um componente específico para isso que roda dentro do componente de atualizar um aluno. Foi tentado criar uma chamada especifica para atualizar a foto no backend, mas também ocorreu problemas.
Adicionar ou excluir um aluno não tiveram o mesmo problema e a foto é salva dentro da pasta backend\writable\uploads.

Outro problema que deveria ser resolvido é a questão do CORS preflight, foram procuradas várias maneiras, mas nenhuma solucionou o mesmo algumas vezes o comando POST para criar o aluno funcionava, mas o PUT e o DELETE não funcionaram de nenhuma maneira, mesmo que tenha sido feito o ajuste no arquivo .env e na chamada do controller, abaixo mostro como ficaram os arquivos, porém o sistema não reconhecia os headers enviados no frontend, as chamadas do backend funcionavem normalmente o que indica que as configurações, possivelmente estão corretas.

    cors.allowedOrigins = 'http://localhost:3000','http://localhost:3000/'
    cors.allowedMethods = GET,POST,PUT,DELETE,OPTIONS
    cors.allowedHeaders = Content-Type,Authorization
    cors.exposedHeaders = 
    cors.allowCredentials = false
    cors.maxAge = 3600
