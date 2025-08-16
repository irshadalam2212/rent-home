import React, { ReactNode } from "react"

type THeadingProps = {
    children: ReactNode;
}

const Heading: React.FC<THeadingProps> = ({ children }) => {
  return (
    <div className="text-center pt-8 pb-4 z-10">
        <h2 className="text-4xl text-primary font-medium">{children}</h2>
    </div>
  )
}

export default Heading;
