interface errorForm {
  message?: string;
  statusCode?: number;
  hint?: string;
}

const encode = ({ message, statusCode, hint }) => {
  const form: errorForm = {};
  console.log("encode");
  if (message) {
    form.message = message;
  }

  if (statusCode) {
    form.statusCode = statusCode;
  }

  if (hint) {
    form.hint = hint;
  }

  return JSON.stringify(form);
};

const decode = (encoded) => {
  return JSON.parse(encoded);
};

const internal = (errorMessage) => {
  return encode({
    message: "서버 처리 도중 로직 오류가 발생하였습니다.",
    statusCode: 500,
    hint: errorMessage,
  });
};

const reject = (errorMessage) => {
  return encode({
    message: errorMessage,
    hint: "권한이 없습니다.",
    statusCode: 400,
  });
};

const noSession = (message) => {
  return encode({
    message,
    hint: "인증정보가 없습니다.",
    statusCode: 401,
  });
};

const db = (error) => {
  if (error.sql) {
    console.log(`QUERY_ERROR:\n${error.sql}`);
  } else {
    console.log(`KNEX_ERROR:\n${error}`);
  }
  console.error(error);

  return encode({
    message: "서버 처리 도중 데이터 오류가 발생하였습니다.",
    statusCode: 500,
    hint: {
      code: error.code,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      sql: error.sql,
    },
  });
};

const cipher = (error) => {
  return encode({
    message: "암호처리 도중 오류가 발생하였습니다.",
    statusCode: 500,
    hint: {
      ...error,
    },
  });
};

const iamport = (error) => {
  const { message } = error.error;
  return encode({
    message: "서버 결제 처리 도중 오류가 발생 하였습니다.",
    statusCode: 500,
    hint: message ? message : "처리되지 않은 아임포트 요청 오류 입니다.",
  });
};

const storage = (error) => {
  const { statusCode, statusMessage } = error.response;
  return encode({
    message: "저장소 처리 도중 오류가 발생 하였습니다.",
    statusCode: 500,
    hint: {
      storageStatusCode: statusCode,
      storageStatusMessage: statusMessage,
    },
  });
};

const email = (error) => {
  return encode({
    message: "이메일 전송에 실패 하였습니다.",
    statusCode: 500,
    hint: error,
  });
};

export default {
  cipher,
  db,
  decode,
  encode,
  iamport,
  internal,
  reject,
  storage,
  email,
  noSession,
};
