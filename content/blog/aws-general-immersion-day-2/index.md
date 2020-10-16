---
title: AWS General Immersion Day - Compute
date: 2020-10-17T01:46:03+09:00
category: Cloud
tags: [AWS, EC2, ELB, ASG]
---

안녕하세요. 2주 만에 돌아온 AWS General Immersion Day 2번째 실습, EC2 구성입니다. 분명 제가 AWS에서 처음 들은 교육이 이 General Immersion Day였는데, 어느덧 제가 AWS에서 들은 교육이 4개를 넘어가기 시작했네요. (...) 새삼스럽지만 블로그 운영도 분발해야겠다고 생각되네요. 😢😿

이번 실습의 주제는 EC2(Compute)지만, 실제 주인공은 ELB(Elastic Load Balancing)와 ASG(Auto Scaling Group)라고 할 수 있답니다. 아마 AWS를 사용할 때 많은 사람이 가장 먼저 접할 서비스인 EC2를 인스턴스에 가해지는 부하에 따라 자동으로 분산하고, 인스턴스 수를 관리해줌으로써 클라우드의 진면목을 느낄 수 있는 대목이기 때문이거든요.

---

## EC2

앞으로 사용할 인스턴스의 바탕이 될 이미지를 만들기 위해 먼저 EC2 인스턴스를 하나 생성해야 합니다. 이미지는 **AMI Linux 2**로 하고 인스턴스 타입은 적당히 프리티어로도 사용할 수 있는 **t2.micro**로 저정합니다.

![](Screen_Shot_2020-10-01_at_16.49.58.png)

네트워크는 이전 단계에서 생성한 VPC-Lab으로 지정한 후 EC2 인스턴스는 외부에서 접근할 수 있는 웹 서버가 구동되기 때문에 Public subnet A를 할당하고 Public IP도 부여해줍니다.

![](Screen_Shot_2020-10-01_at_16.50.32.png)

Advanced Details 부분에 기초 세팅을 진행하는 스크립트를 복사해서 붙여넣습니다.

```shell
#!/bin/sh
yum -y install httpd php mysql php-mysql
chkconfig httpd on
systemctl start httpd
if [ ! -f /var/www/html/bootcamp-app.tar.gz ]; then
   cd /var/www/html
   wget https://s3.amazonaws.com/awstechbootcamp/GettingStarted/bootcamp-app.tar.gz
   tar xvfz bootcamp-app.tar.gz
   chown apache:root /var/www/html/rds.conf.php
fi
yum -y update
```

![](Screen_Shot_2020-10-01_at_16.54.34.png)

스토리지는 기본 설정인 8기가로 두고, Name 태그를 추가해서 인스턴스를 쉽게 인식할 수 있도록 합니다.

![](Screen_Shot_2020-10-01_at_16.55.37.png)

EC2는 웹 서버이므로 Security Group에 HTTP 80 포트를 추가해야 외부에서 접근할 수 있습니다.

![](Screen_Shot_2020-10-01_at_17.01.53.png)

![](Screen_Shot_2020-10-01_at_17.04.19.png)

인스턴스 초기화가 끝난 후 Public IP 또는 DNS로 접근해보면 위와 같은 페이지가 로딩됩니다.

![](Screen_Shot_2020-10-01_at_17.07.48.png)

![](Screen_Shot_2020-10-01_at_17.10.42.png)

이렇게 기초 세팅이 끝난 인스턴스를 템플릿으로 활용할 수 있도록 *Web Server v1*이라는 새로운 이미지로 저장합니다.

![](Screen_Shot_2020-10-01_at_17.12.26.png)

![](Screen_Shot_2020-10-01_at_17.13.15.png)

Images 메뉴에서 생성한 이미지가 확인되면 생성했던 인스턴스를 삭제하면 됩니다.

---

## Load Balancing

이제 방금 만든 이미지를 바탕으로 Load Balancer를 구성해보겠습니다.

![](Screen_Shot_2020-10-01_at_17.14.59.png)

Load Balacing 메뉴에서 HTTP / HTTPS로 타입의 Load Balancer를 생성합니다.

![](Screen_Shot_2020-10-01_at_17.16.16.png)

이름은 **Web-ALB**, VPC는 **VPC-Lab**, 가용 영역은 각 영역의 **Public subnet**으로 지정하면 됩니다. 로드 밸런서가 Public 영역에 속하는 이유는 위에서 처음 EC2 인스턴스를 생성했을 때와 비슷한 이유로 사용자가 웹 서버에 접근하기 위해 거쳐가는 구간이기 때문이랍니다.

![](Screen_Shot_2020-10-01_at_17.19.23.png)

그러니 마찬가지로 HTTP 포트 접근 권한도 추가해야 하겠죠?

![](Screen_Shot_2020-10-01_at_17.20.16.png)

방금 설정한 Security Group이 로드 밸런서로 들어오는 요청에 관한 내용이라면 Routing은 로드 밸런서로 들어온 요청을 어디로 처리해줄 것인가에 관한 내용입니다.

로드 밸런서로 웹 서버 접근 요청(HTTP:80)이 들어오면 로드 밸런서는 이 요청을 EC2 인스턴스로 분산해서 보내주어야 하므로 Target type을 Instance로 두고 넘어가면 되겠습니다.

---

## Launch Template

앞서 로드 밸런서가 들어오는 요청을 EC2 인스턴스로 분산해서 보내준다고 했는데, 아직 실행 중인 EC2 인스턴스가 없죠? 인스턴스를 실행하기에 앞서 Auto Scaling Group에서 관리할 인스턴스를 먼저 정의해야 합니다. 아무것도 설치되지 않은 이미지를 Auto Scaling 하더라도 아무 일도 하지 않을 테니까요. (...)

![](Screen_Shot_2020-10-01_at_17.34.37.png)

그래서 ASG를 통해 생성되는 인스턴스에 할당할 Security Group을 먼저 생성해보겠습니다.

![](Screen_Shot_2020-10-01_at_17.37.19.png)

이름은 ASG-Web-Inst-SG로 하면 되고 Inbound rules의 HTTP Source를 로드 밸런서의 Security 그룹으로 지정해야 합니다. Auto Scaling Group에 대한 HTTP 접근이 로드 밸런서를 거쳐 오기 때문이니까요.

![](Screen_Shot_2020-10-01_at_17.39.53.png)

이제 Launch template에서 오토 스케일러가 관리할 이미지를 정의하겠습니다. 템플릿의 이름과 설명을 입력하고 **Auto Scaling guidance**에 체크해 템플릿이 Auto Scaling에 활용할 수 있도록 설정합니다.

![](Screen_Shot_2020-10-01_at_17.41.07.png)

AMI는 처음에 만들어둔 *Web Server v1*으로 지정하고 VPC는 템플릿을 만들기 전 미리 만든 그룹을 사용합니다.

![](Screen_Shot_2020-10-01_at_17.43.30.png)

Resource tags에 알맞은 태그를 지정하고 템플릿을 생성하면 됩니다.

---

## Auto Scaling

드디어 대망의 Auto Scaling Group 섹션에 도달했습니다! 그냥 EC2만 돌리면 될 것을 뭐하러 여기까지 돌아와야 했던가, 그것은 무조건 ASG를 구성할 필요는 없지만 인스턴스의 부하 정도에 따라 인스턴스 수가 자동으로 조절된다는 관리·운영상 이점을 얻으려면 꼭 해야 하는 단계이기 때문이랍니다. (~~이래서 도커를 사용하면 배포에서도 이점을 가져할 수 있긴 합니다.~~)

![](Screen_Shot_2020-10-01_at_17.46.14.png)

ASG에서 관리할 템플릿을 지정하고,

![](Screen_Shot_2020-10-01_at_17.47.46.png)

서브넷은 Private 영역의 서브넷을 할당하면 됩니다. 앞서 로드 밸런서에 Public 영역의 서브넷을 할당했었고, ASG로 들어오는 HTTP 요청은 모두 로드 밸런서를 통해 들어올 수 있습니다.

![](Screen_Shot_2020-10-01_at_17.48.24.png)

로드 밸런싱도 앞에서 만들었던 로드 밸런서를 추가하고,

![](Screen_Shot_2020-10-01_at_17.49.30.png)

스케일링 정책에서 인스턴스 수를 관리하는 규칙을 정할 수 있습니다.

![](Screen_Shot_2020-10-01_at_17.50.15.png)

Name 태그를 추가하면 ASG를 통해 생성되는 인스턴스에 이름을 붙일 수 있습니다.

![](Screen_Shot_2020-10-01_at_17.51.08.png)

![](Screen_Shot_2020-10-01_at_17.51.25.png)

ASG 설정이 끝난 후 Instances를 확인해보면 오토 스케일러를 통해 생성된 2개의 인스턴스가 실행되는 걸 확인할 수 있습니다.

![](Screen_Shot_2020-10-01_at_17.58.30.png)

Load Balancer 메뉴에 들어가서 DNS를 확인 후 DNS로 접근하면 실행 중인 웹 서버로 접근할 수 있습니다.

![](Screenshot_2020-10-01_Welcome_to_the_AWS_Tech_Fundamentals_Bootcamp-1.png)

![](Screenshot_2020-10-01_Welcome_to_the_AWS_Tech_Fundamentals_Bootcamp-2.png)

새로고침을 하다 보면 접속할 때마다 가용 영역과 인스턴스가 바뀌는 걸 확인할 수 있습니다.

![](Screen_Shot_2020-10-01_at_18.03.17.png)

위에서 `LOAD TEST` 버튼을 누르면 인스턴스에 지속적으로 부하를 발생시키는데, 오토 스케일러를 확인하면 실시간으로 CPU 사용률이 올라가는 모습도 확인할 수 있습니다.

![](Screen_Shot_2020-10-01_at_18.08.37.png)

![](Screen_Shot_2020-10-01_at_18.08.53.png)

그리고 오토 스케일러를 구성할 때 지정한 정책에 따라 인스턴스의 수가 관리됩니다.

![](Screen_Shot_2020-10-01_at_18.09.49.png)

![](Screen_Shot_2020-10-01_at_18.10.01.png)

스케일 정책은 언제든지 자유롭게 수정할 수 있고,

![](Screen_Shot_2020-10-01_at_18.17.30.png)

지정한 정책에 따라 인스턴스 수가 오토 스케일러를 통해 자동으로 조절됩니다.

![](gid-ec2-01.svg)

이렇게 해서 ELB와 ASG의 조합을 통한 EC2 구성까지 모두 끝났습니다. 이제 인스턴스에 가해지는 부하에 따라 인스턴스 수가 자동으로 조절되는 매우 유연한(?) 구조를 갖추게 됐습니다.

하지만 아직 DB가 없기 때문에 다음 시간에는 여기에 DB를 추가한 시스템을 구성... 하려고 했으나, 안타깝게도 실습을 하며 찍어둔 DB 파트의 사진이 무언가를 삭제하며 같이 삭제된 것으로 추정(...)돼 DB 파트 실습을 블로그에 작성하기는 아마 힘들지 않을까 하는 생각이 듭니다. 😇

DB 파트만 AWS 가이드의 사진을 가져와서 해설만 덧붙이는 방식으로 진행해볼까 생각도 해봤는데, 그럴 것 같으면 그냥 AWS 가이드를 보고 진행하면 되지 않나 싶어서 General Immersion Day 실습은 이 편을 끝으로 (강제로) 마무리해야 할 것 같습니다. 하지만 조만간 또 AWS 행사에 참여하기도 하고, 현재 GitHub Actions를 활용한 컨테이너 배포 자동화도 준비 중이라 더욱 다양하게 접근할 수 있는 기회(?)라 생각하면서 글머리에 적었던 말을 되새김 해보겠습니다.
