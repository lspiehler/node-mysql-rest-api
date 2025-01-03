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
$values.Add(@("John", "Smith"))
$values.Add(@("Jane", "Doe"))

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
    query = "INSERT INTO ``example_table`` (``first``, ``last``) VALUES ?"
    values = $wrapinsert
}

$query = @{
	Headers = @{
			"Content-Type" = "application/json"
	}
	Uri = "http://mysqlapi.mydomain.org/query"
	Method = "PUT"
	Body = $body | ConvertTo-Json -Depth 3
} | % { Invoke-RestMethod @_ }

$query.results
```

## Example Powershell SELECT
```
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
    query = "SELECT * FROM ``example_table``"
}

$query = @{
	Headers = @{
			"Content-Type" = "application/json"
	}
	Uri = "http://mysqlapi.mydomain.org/query"
	Method = "POST"
	Body = $body | ConvertTo-Json -Depth 3
} | % { Invoke-RestMethod @_ }

$query.results
```

## Example Powershell DELETE
```
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
    query = "DELETE FROM ``example_table`` WHERE ``first`` = ?"
    values = @("John")
}

$query = @{
	Headers = @{
			"Content-Type" = "application/json"
	}
	Uri = "http://mysqlapi.mydomain.org/query"
	Method = "DELETE"
	Body = $body | ConvertTo-Json -Depth 3
} | % { Invoke-RestMethod @_ }

$query.results
```

## Example Powershell UPDATE
```
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
    query = "UPDATE ``example_table`` SET ``first`` = 'John' WHERE ``first`` = 'Jane'"
    values = @("John")
}

$query = @{
	Headers = @{
			"Content-Type" = "application/json"
	}
	Uri = "http://mysqlapi.mydomain.org/query"
	Method = "PATCH"
	Body = $body | ConvertTo-Json -Depth 3
} | % { Invoke-RestMethod @_ }

$query.results
```

## Build and Run Docker Container
```
docker build -t lspiehler/node-mysql-rest-api:latest .
docker run -d -it --restart unless-stopped --name=node-mysql-rest-api -p 3001:3000 lspiehler/node-mysql-rest-api:latest
