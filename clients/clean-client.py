import os
import fileinput

client_dir = 'clients/client/api/'

files = os.listdir(client_dir)

for file_name in files:
    with fileinput.FileInput(client_dir + file_name, inplace=True) as file:
        for line in file:
            print(line.replace('localVarHeaders', 'headers'), end='')

print('\nCleaned files:', *files, sep='\n- ')
