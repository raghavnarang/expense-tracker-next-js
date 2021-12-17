const PageCard: React.FC<{small?: boolean}> = ({ children, small = false }) => {
    const fullWidth = !small ? 'w-4/5' : 'w-auto';

    return <div className={`flex h-screen w-screen justify-center items-center bg-gray-100`}>
        <div className={`container rounded-2xl shadow-2xl ${fullWidth} h-4/5 p-10 bg-white`}>
            {children}
        </div>
    </div>
}

export default PageCard;