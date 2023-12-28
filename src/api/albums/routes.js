const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler, // menerima dan menyimpan satu album
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbumsHandler, // mengembalikan banyak albums
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler, // mengembalikan satu album
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler, // menerima dan mengubah satu album
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler, // menghapus satu album
  },
];

module.exports = routes;
