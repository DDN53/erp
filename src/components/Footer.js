export const Footer = () => {
  return (
    <footer className="w-full py-4 border-t border-gray-200 bottom-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-2 md:mb-0">
          {/* <p>2024 © All Rights Reserved. <a href="/privacy" className="underline">Privacy Policy</a> | <a href="/terms" className="underline">Terms of Service</a></p> */}
          <p>2024 © All Rights Reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <p>Developed by NWSDB IT Division</p>
        </div>
      </div>
    </footer>
  );
};
