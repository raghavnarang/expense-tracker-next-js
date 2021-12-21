import { ReactElement } from "react";

type propsType = {
    small?: boolean,
    head?: ReactElement,
    foot?: ReactElement
}

const PageCard: React.FC<propsType> = ({ children, small = false, head, foot }) => {
    const fullWidth = !small ? 'w-4/5' : 'w-auto';

    return <div className={`flex min-h-screen w-screen items-center bg-gray-100 flex-col`}>
        {!!head && <div className={`container w-4/5 p-10`}>
            {head}
        </div>}
        <div className={`container rounded-2xl shadow-2xl ${fullWidth} p-10 h-full bg-white`}>
            {children}
        </div>
        {!!foot && <div className={`container w-4/5 p-10`}>
            {foot}
        </div>}
    </div>
}

export default PageCard;