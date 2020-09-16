# Assignment #2: gRPC and REST API Benchmarking

# 1. Write a code to benchmark the performance of the book services called via gRPC and REST APIs. You can write a client side to make some calls to the same function/service and measure the response time. The benchmarking needs to take into account the following scenarios: 

### 1.1 Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items. 

ทำการทดลองโดย insert book เป็นจำนวน 1, 4, 16, ...., 4096 โดยยิง request ซ้ำจนครบ 4096 เล่ม (เพื่อให้ขนาดของ array เท่ากันในทุก ๆ การทดลอง) ซึ่งจากการทดลองพบว่า REST API เร็วกว่า gRPC เมื่อไฟล์มีขนาดใหญ่ ๆ ดังกราฟ

![](asset/1a.jpg?raw=true)

### 1.2 Multiple clients with different kind of calls 

ยิง request ด้วย 4 clients ที่แตกต่างกัน คือ insert get delete และ list พบว่า REST ทำงานได้เร็วกว่าในการ insert get delete ในขณะที่ gRPC ทำงานได้เร็วกว่าในการ list ดังกราฟ

![](asset/1b.jpg?raw=true)

### 1.3 Vary the number of concurrent calls from 1 to 4096 calls. (list book)

สร้าง client หลาย ๆ ตัวขึ้นมา getBook พร้อม ๆ กัน ซึ่งจากผลการทดลองพบว่า gPRC ทำงานได้เร็วกว่า REST ดังกราฟ

![](asset/1c.jpg?raw=true)

### 1.4 Our scenario

ทดสอบ listBook โดยให้ server return จำนวน book ต่างๆกัน ซึ่งจากผลการทดลองพบว่า REST ทำงานได้เร็วกว่า gPRC ดังกราฟ

![](asset/1d.jpg?raw=true)

# 2. Discussion of the results why one method is better than the other in which scenarios.

gRPC response time เร็วกว่า REST เพราะไม่มี overhead จากการ handshake ของ http connection อย่างไรก็ตามจากการทดลองของกลุ่มเราพบว่า REST เร็วกว่า gRPC เวลาที่มีการ request/response payload ซึ่งมีขนาดใหญ่ ๆ (ไม่สามารถอธิบายเหตุผลได้) 

# 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance.

### 3.1 language neutral
ทั้ง REST และ gRPC นั้น flexible ต่อการใช้งานทั้งคู่ ขึ้นอยู่กับว่า lib ที่ต้องการใช้นั้นสามารถใช้ได้กับอะไร ทั้งนี้ในมุมมองของกลุ่มเรามองว่า gRPC นั้นมีความ flexible และสะดวกต่อการใช้งานเพราะมี protobuf ที่ช่วยจัดการแปลงข้อมูลต่าง ๆ ให้ทำให้ไม่ต้องเขียนโค้ดในส่วนนี้เอง
### 3.2 ease of use
ในด้านการใช้งาน REST ใช้ JSON ซึ่งเป็น plain text ทำให้การใช้งานง่าย และสะดวกกว่า gRPC ซึ่งเป็น binary
### 3.3 performance
ถ้าเป็น request/response ที่มี payload ขนาดเล็ก gRPC จะทำงานได้เร็วกว่า REST เนื่องจากไม่ต้องมี overhead ในส่วนของ TCP connection handcheck อย่างไรก็ตามหากมี payload ขนาดใหญ่ REST จะทำงานได้เร็วกว่า gRPC

# 4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplified-fd35d01bbd4? How? 
ต่างกันในเรื่องเกี่ยวกับ payload size: ที่ grpc จะรับ payload ใหญ่ ๆ ได้แย่กว่า REST 

# Team Members
- `6031323521`	โรจนณัฐ	คุณากรโอภาส
- `6030352521`	ปพน	ชัยศรีสุขอำพร
- `6030583121`	เศรษฐ์	ภูภักดิ์
- `6030044221`	กาญจนา	เพชรนอก
- `6030665021`	รพีพงศ์	เศรษฐวิพัฒนชัย
- `6030031021`	กษิดิศ	รัตนวงศ์พิทักษ์


