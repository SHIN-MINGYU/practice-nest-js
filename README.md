# NestJS

## 1. Create a new project with @nest/cli

```
$ npm i -g @nest/cli
$ nest new <project-name>
```

## 2. create module

```
nest g module <module-name>
```

- g : generate

- module : schematic that i want to create
- boards : name of the schemaric

## 3. What is Controller?

- Controller do processing about request and return response to client

- Controller define to <strong>@Controller</strong> decorator

- <strong>@Controller</strong> decorator first parameter is root URL String

### How to Create the Controller?

```
nest g controller <controller-name> --no-spec
```

- controller : controller schematic
- controller-name : name of controller schematic
- --no-spec : do not generate test code for controller

## 4. What is Handler?

- A Simple Method what decorated by decorator like <strong>@Get, @Post, @Delete ..etc</strong>

## 5. What is Service?

- Service is to process logic about databases or validation of data
- Through <strong>@Injectable</strong> decorator, NestJS create injectablity of this service-file to another component
- If we want to use this service file, write service-type variable in controller parameters(DI)
- The parameter what decline with access modifier be handled to class property in the class file

### How to Create the Service?

```
nest g sevice <controller-name> --no-spec
```

## 6. Define Model

- Use Class or interface

- Interface : it can check just type
- Class : it can check type and create instance

## 7. How to bring data of client request

- use Decorator<strong>@Body('property-name')</strong>
- Express

```
app.post("/",(req,res)=>{
    console.log(req.body)
})
```

- NestJS

```
 @Post()
 exampleFunc(@Body() body){
    console.log(body)
 }
```

## 8. What is DTO(Data Transfer Object)?

- This is object for to transter data
- This object define How to transfer data through network
- This object can defined by interface or class. but In NextJS, recommended to use class

### Why DTO used to transfer data?

- this is useful for validation data
- this create more stable code, and used to typescript's type

## 9. @Param decorator

- In GET request, the decorator return qs-string params

```
@Param('name')
```

## 10. What is Pipe?

- In NextJS, it is class what use <strong>@injectable</strong> decorator
- Pipe is used to transform data and validate data
- Pipe is worked by controller route processer
- Pipe is called before the controller's method is called

### Handler-level pipe

- use <strong>@UsePipes()</strong>decorator
- this is used just in designated handler function

### Parameter-level pipe

- use in <strong>@Body()</strong> decorator's second parameter

### Global-level pipe

- this is apply all request
- we should input <strong>app.useGlobalPipes()</strong> method in main.ts

### Built-in pipe

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

### Useful pipe library

- class-validator
- class-transformer

## 11. How to Create custom-pipe?

- All custom-pipes are should imlement PipeTransform
- Also, need transform method. this method is used process argument in NextJS

transfrom method

```
transform(value, metadata)
```

- value : processed argument value
- metadata : object include meta-data about arguments
- return : send to route handler, if exception is occuredm it is sent to client directly
