// fetch the users from the database
const display = document.getElementById('display');
const demo = document.getElementById('demo');
// demo.innerText = document.cookie;
async function fetchUsers(){
    const response = await fetch("http://localhost:5000/users",
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    );

    const result = await response.json();
    display.textContent = JSON.stringify(result);
}
fetchUsers();