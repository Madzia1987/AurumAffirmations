import crystalImage from '@assets/file_00000000a1d86243a19cc31ead66b830.png';

const CrystalDivider = () => {
  return (
    <div className="relative w-full h-[200px] overflow-hidden">
      <img 
        src={crystalImage} 
        alt="Crystal divider" 
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
    </div>
  );
};

export default CrystalDivider;