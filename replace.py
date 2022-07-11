import os

def replace(fileName):
    file = open(fileName, "r", encoding="utf-8").read()

    l1 = 0
    data = ""
    while True:
        l2 = file.find("onClick={", l1)
        if l2 == -1:
            data += file[l1:]
            break
        l3 = l2 + 9
        l4 = file.find("}", l2) + 1
        onClick = file[ l3: l4 ]
        
        data += file[ l1 : l4] + " onTouchEnd={" + onClick

        l1 = l4
    log = open(fileName, "w", encoding="utf-8")
    log.write(data)
    log.flush

def getFileList(location):
    targets = []
    for root, dirs, files in os.walk(location, topdown=True):
        for name in files:
            # print(name)
            if name[-4:] == ".jsx":
                path = root + "/" +  name
                # patth = path.replace("\\", "/")
                targets.append(path)
                replace(path)
    print(targets)

getFileList("src")





