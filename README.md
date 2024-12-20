## Example Usage
To insert, send HTTP PUT request to /insert, Example:
```
{
        "mysql": {
                "host": "mysql_host",
                "user": "mysql_username",
                "password": "mysql_passord",
                "database": "mysql_database",
                "ssl": {
                        "rejectUnauthorized": false
                }
        },
        "query": "INSERT INTO `gpos` (`root`, `ou`, `gpo_name`) VALUES ?",
        "values": [[
                ["ROOT1", "OUNAME1", "GPONAME1"],
                ["ROOT2", "OUNAME2", "GPONAME2"]
        ]]
}
```

## Example Powershell Insert
```
$values = [System.Collections.ArrayList]@()
$values.Add(@("ROOT1", "OUNAME1", "GPONAME1"))
$values.Add(@("ROOT2", "OUNAME2", "GPONAME2"))

$wrapinsert = New-Object -TypeName System.Collections.ArrayList
$wrapinsert.Add($values)

$body = @{
    mysql = @{
        host = "mysql_host"
                user = "mysql_username"
                password = "mysql_passord"
                database = "mysql_database"
                ssl = @{
                        rejectUnauthorized = $False
                }
    }
    query = "INSERT INTO ``associated_gpos`` (``root``, ``ou``, ``gpo_name``) VALUES ?"
    values = $wrapinsert
}

@{
        Headers = @{
                "Content-Type" = "application/json"
        }
        Uri = "https://mysqlapi.mydomain.org/insert"
        Method = "PUT"
        Body = $body | ConvertTo-Json -Depth 3
} | % { Invoke-RestMethod @_ }
```

## Build and Run Docker Container
```
docker build -t lspiehler/node-mysql-rest-api:latest .
docker run -d -it --restart unless-stopped --name=node-mysql-rest-api -p 3001:3000 lspiehler/node-mysql-rest-api:latest
