const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    // console.log(name, year);

    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    // console.log(query);

    const result = await this._pool.query(query);
    // console.log(result);

    if (!result.rows[0].id) {
      // console.log(result.rows[0].id);
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows.map(mapDBToModel);
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const songQuery = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    const songResult = await this._pool.query(songQuery);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    // console.log(result.rows[0].id);

    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      year: result.rows[0].year,
      songs: songResult.rows.map(mapDBToModel),
    };
  }

  async editAlbumById(id, { name, year }) {
    // const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
