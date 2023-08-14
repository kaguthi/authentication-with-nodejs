const userName = document.getElementById('username');
const passWord = document.getElementById('password');
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    const user = userName.value.trim();
    const pass = passWord.value.trim();

    // check if the field are empty
    if (user == "" || pass == "") return alert("Please fill in the data");

    const response = await fetch(
        "http://localhost:4000/login",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: user, password: pass
                }
            )
        }
    )

    const result = await response.json();
    alert(result['message']);
});