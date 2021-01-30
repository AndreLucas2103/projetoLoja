// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    "language": {
      "lengthMenu": "Mostrar por página _MENU_ ",
      "zeroRecords": "Nenhum Registro Encontrado",
      "info": "Mostrando Página _PAGE_ de _PAGES_ - TOTAL: _TOTAL_",
      "infoEmpty": "Nenhum registro Disponível",
      "infoFiltered": "(filtrado de _MAX_ registro no total)",
      "sSearch": "Pesquisar",

      "oPaginate": {
          "sNext": ">",
          "sPrevious": "<",
          "sFirst": "«",
          "sLast": "»"
      }, 
    }
  });
});
