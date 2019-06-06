Apollo Aperture - with REACT, Apollo Client, and GraphQL API applications only

A developer tool to chronologically track React components being rendered when utilizing Apollo Client and/or with  apollo-cache-inmemory for remote data caching and state management.

File structure is as follows:

## bin/
Startup files for running apollo-aperture go here

## samples/
Sample files for testing file traversal and AST go in this folder

### samples/crud_app
Mike's CRUD app goes here. This folder is separated into two subfolders: 1) compiled and 2) src. Copy the uncompiled files into the src directory

Additional examples will be placed into other subfolders in samples/[subfolder_name]

## ast/
Folder for placing AST parsing and traversal files

## map_files/
Folder for placing file mapping files
