const User = ({el}) => {

    return (
        <>
            <div className="user">
                <h1>Name: {el.name}</h1>
                <p>Email: {el.email}</p>
                <p>Verified: {el.isVerified ? "yes" : "no"}</p>
            </div>
        </>
    );


}

export default User