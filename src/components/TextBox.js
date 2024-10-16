const TextBox = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-3 py-2 text-base border  rounded-md focus:outline-none"
      />
    </div>
  );
};

export default TextBox;
