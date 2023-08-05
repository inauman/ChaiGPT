def csv_reader(file_name):
    file = open(file_name)
    result = file.read().split("\n")
    return result

def csv_reader_gen(file_name):
    for row in open(file_name, "r"):
        yield row

def csv_reader_gen_word(file_name):
    for row in open(file_name, "r"):
        words = row.split(",")
        for word in words:
            yield word.strip()

def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

def main():
    #csv_gen = csv_reader("dummy-data.txt")
    csv_file_line = csv_reader_gen("dummy-data.txt")
    row_count = 0

    for row in csv_file_line:
        #print(row)
        row_count += 1

    print(f"Row count is {row_count}")

    csv_file_word = csv_reader_gen_word("dummy-data.txt")
    for word in csv_file_word:
        print(word)
    # for i in infinite_sequence():
    #     print(i, end=" ")

if __name__ == "__main__":
    main()