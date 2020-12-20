interface testQuery {
  updateTestUser?: any;
}
export const newTestQuery = async () => {
  const self: testQuery = {};

  self.updateTestUser = async () => {
    const query = `
        UPDATE ml_lecture
        SET
          language_code = ?, lecture_title = ?, thumbnail_url = ?, thumbnail_path = ?, thumbnail_file_name = ?,
          lecture_material_url = ?, lecture_material_path = ?, lecture_material_file_name = ?
        WHERE
          lecture_id = ?
          AND state != 'deleted'
      `;

    //   try {
    //     const ret = await db.raw(query, [
    //       languageCode,
    //       lectureTitle,
    //       thumbnailUrl,
    //       thumbnailPath,
    //       thumbnailFileName,
    //       lectureMaterialUrl,
    //       lectureMaterialPath,
    //       lectureMaterialFileName,
    //       lectureId,
    //     ]);
    //     return utils.toInsertKey(ret);
    //   } catch (error) {
    //     throw new Error(errors.db(error));
    //   }
  };
};
