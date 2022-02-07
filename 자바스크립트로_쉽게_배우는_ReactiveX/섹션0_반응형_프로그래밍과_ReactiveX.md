# 섹션0. 반응형 프로그래밍과 ReactiveX

이 강의에서는 ReactiveX를 사용하여 반응형 프로그래밍을 보여줄 예정

## 함수형 프로그래밍

- 반응형 프로그래밍의 단짝친구로 변수사용을 지양하고 순수함수사용을 통해 프로그래밍을함.
- 어떤 과정을 선언하는 형식을 갖고있음.
- 구현되어있는 순수함수들을 가져다쓰는 방식으로 사용됨.

## ReactiveX 의 세 요소

1. 일련의 값들을 발행하는 **Observable**
    1. 일련된 값들을 흐름, stream이라고 부름.
2. 이 stream을 타고 흐르는 값들은 이 배관, 파이프를 거치며 **Operator**(연산자)들을 거치게됨.
3. 마지막으로 **Observer**는 파이프만 쳐다보며 값을 기다리다(subscribe)가 뭔가 나오는대로 최종 작업을 실행함.

### Rx Visualizer

- [https://rxviz.com/](https://rxviz.com/)

# 강의를 위한 준비물

- [https://gitlab.com/yalco/yalco-rxjs-practice-server](https://gitlab.com/yalco/yalco-rxjs-practice-server)