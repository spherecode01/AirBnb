export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://air-al0p.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }


  {/* 
export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'http://localhost:4000/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }*/}