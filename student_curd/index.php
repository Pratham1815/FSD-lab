<?php
$conn = new mysqli("localhost", "root", "", "studentdb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<?php include 'db.php'; ?>

<?php
$conn = new mysqli("localhost", "root", "", "studentdb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM student");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student CRUD</title>
    <style>
        body {
            font-family: Arial;
            margin: 40px;
        }
        form {
            margin-bottom: 20px;
        }
        input {
            padding: 8px;
            margin: 5px;
        }
        button {
            padding: 8px 12px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        table, th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>

<h2>Student Entry Form</h2>

<form action="insert.php" method="POST">
    <input type="text" name="name" placeholder="Enter Name" required>
    <input type="email" name="email" placeholder="Enter Email" required>
    <input type="text" name="mobile" placeholder="Enter Mobile" required>
    <input type="text" name="department" placeholder="Department" required>
    <button type="submit">Add Student</button>
</form>

<h2>Student Records</h2>

<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Department</th>
        <th>Action</th>
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id']; ?></td>
        <td><?= $row['name']; ?></td>
        <td><?= $row['email']; ?></td>
        <td><?= $row['mobile']; ?></td>
        <td><?= $row['department']; ?></td>
        <td>
            <a href="edit.php?id=<?= $row['id']; ?>">Edit</a> |
            <a href="delete.php?id=<?= $row['id']; ?>" onclick="return confirm('Delete?')">Delete</a>
        </td>
    </tr>
    <?php endwhile; ?>

</table>

</body>
</html>