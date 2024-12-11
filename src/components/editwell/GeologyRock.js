import React from "react";

function GeologyRock(props) {
  return (
    <div>
      <textarea
        placeholder="GeologyRock"
        name="GeologyRock"
        value={props.formData.GeologyRock}
        onChange={props.handleChange}
        type="text"
        className="w-full h-[300px] p-2 border border-gray-500 rounded-md dark:bg-slate-600 dark:text-white text-black  "
      />
    </div>
  );
}

export default GeologyRock;
