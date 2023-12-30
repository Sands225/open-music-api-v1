/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  name,
  title,
  year,
  genre,
  performer,
  duration,
  albumid,
}) => ({
  id,
  name,
  title,
  year,
  genre,
  performer,
  duration,
  albumid,
});

module.exports = { mapDBToModel };
