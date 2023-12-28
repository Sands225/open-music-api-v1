const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler, // menerima dan menyimpan satu lagu
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler, // mengembalikan banyak lagu
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler, // mengembalikan satu lagu
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler, // menerima dan mengubah satu lagu
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler, // menghapus satu lagu
  },
];

module.exports = routes;
