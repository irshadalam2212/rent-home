const AreaBadge = ({ areaUnit }: { areaUnit: any }) => {
    return <span dangerouslySetInnerHTML={{ __html: areaUnit }} />;
  };
  
  export default AreaBadge;