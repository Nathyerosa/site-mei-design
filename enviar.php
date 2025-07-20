<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = $_POST["nome"];
  $email = $_POST["email"];
  $telefone = $_POST["telefone"];
  $servico = $_POST["servico"];
  $mensagem = $_POST["mensagem"];

  $destinatario = "seuemail@seudominio.com"; // coloque seu e-mail aqui
  $assunto = "Novo contato do site MEISolutions";

  $corpo = "Nome: $nome\n";
  $corpo .= "Email: $email\n";
  $corpo .= "Telefone: $telefone\n";
  $corpo .= "Serviço: $servico\n";
  $corpo .= "Mensagem:\n$mensagem\n";

  $headers = "From: $email";

  if (mail($destinatario, $assunto, $corpo, $headers)) {
    echo "Mensagem enviada com sucesso!";
  } else {
    echo "Erro ao enviar mensagem.";
  }
}
?>
