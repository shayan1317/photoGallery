import React from "react";

function SignUP({ SubmitToDataBase, msg }) {
  return (
    <div className="col-6">
      <div className="content">
        <h2 className="title">sign up</h2>
        <form action="#" className="p-5" onSubmit={SubmitToDataBase}>
          <div class="form-group">
            <label>Enter full name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>enter email</label>
            <input type="text" class="form-control" />
          </div>

          <div class="form-group">
            <label>enter user name</label>
            <input type="text" class="form-control" />
          </div>
          <div className="error_msg">{msg}</div>
          <div class="form-group">
            <label for="formGroupExampleInput2">enter password</label>
            <input type="password" class="form-control" />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
      ;
    </div>
  );
}

export default SignUP;
