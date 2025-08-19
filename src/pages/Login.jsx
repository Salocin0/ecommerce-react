function Login ({login,loginAsAdmin}){
    return(<div>
        <button onClick={login} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center">Login</button>
        <button onClick={loginAsAdmin} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center">Login as Admin</button>
    </div>)
}

export default Login