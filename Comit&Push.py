import os
os.system('cls')
print("Hii 在使用服务前，记得检查是否安装了Git呀")
print("---->不需要我告诉你，Git不是GitHub吧 =w=")
while True:
    print("//////////////////////////////////////\n")
    os.system('git add --refresh')
    os.system('git status')
    print("======================================\n")
    
    message = input("Commit总结：")
    try:
        os.system('git commit -a -m "{message}" --no-verify'.format(message=message))
    except:
        print("\n\n########### 呀，好像出错了诶 ##########")
        print("  那...好好检查一下吧！")
        continue

    push = input("需要Push嘛？Push就说'Yes'")
    if push == "Yes" or push=="YES" or push == "yes" or push == "Y" or push == "y":
        try:
            os.system("git push")
        except:
            print("\n\n########### 呀，好像出错了诶 ##########")
            print("  那...好好检查一下吧！")
            continue


