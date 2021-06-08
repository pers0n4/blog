---
title: AWS General Immersion Day - Network
date: 2020-10-04T21:58:17+09:00
category: Cloud
tags: [AWS, VPC]
---

한 달 하고도 조금 더 이전에(?) AWS에서 진행하는 General Immersion Day 웨비나에 참가했습니다. 대략 8시간 동안 AWS의 주요 서비스인 EC2, RDS, S3에 대한 소개와 실습을 진행했었는데, 그때 진행한 실습을 다시 복습하는 차원에서 블로그에 정리해보려고 합니다.

실습은 <https://kr-id-general.workshop.aws/ko>에서 제공되는 가이드를 바탕으로 일부 진행 과정은 설명을 줄이거나, 제가 실습하는 중 부연 설명이 있으면 좋겠다고 느낀 부분에는 설명을 덧붙이는 방식으로 진행할 예정입니다. 기본 가이드 자체가 워낙 잘 만들어져 있어서 가이드가 필요한 분들은 AWS 가이드를 참고하시면 좋을 것 같습니다. (실습 후기에 사용하는 이미지는 최대한 직접 실습 중에 찍은 이미지를 활용할 예정이며, 가이드에 포함된 이미지는 블로그에 실습 정리용으로 사용해도 된다고 미리 동의를 구했습니다.)

![](https://kr-id-general.workshop.aws/images/main-dg.svg)

우리가 만들 최종 결과물은 2곳의 가용 영역에서 부하에 따라 인스턴스 수가 자동으로 조절되는 클라우드 시스템입니다. 제가 처음 클라우드를 접했을 때 구성해 보고 싶었던 조합(Auto Scaling, Load Banlancing)이었는데, AWS General Immersion Day를 통해서 구성해보게 됐습니다. 아무런 지식도 없는 상태에선 어떻게 해야 할지 막막했었는데, 하나씩 따라 하다 보니 어렵지 않게 완성할 수 있더라고요.

---

그럼 우선 인스턴스들끼리 통신을 위한 네트워크(VPC) 구성부터 시작해볼까요?

![](Screen_Shot_2020-10-01_at_14.57.09.png)

_Elastic IPs_ 메뉴에서 **Allocate Elastic IP address** 버튼을 눌러 NAT Gateway에 할당할 Public IP를 미리 하나 할당받습니다.

![](Screen_Shot_2020-10-01_at_15.04.03.png)
![](Screen_Shot_2020-10-01_at_15.04.37.png)

그리고 _VPC Dashboard_ 에서 **Launch VPC Wizard** 버튼을 누르고 _VPC with Public and Private Subnets_ 항목을 선택하면 Public 영역과 Private 영역의 Subnet을 한 번에 생성할 수 있습니다.

![](Screen_Shot_2020-10-01_at_15.19.03.png)

위에서 첨부한 이미지에서는 172.16.0.0 대역의 IP를 사용한다고 되어 있지만, AWS 가이드에서는 10.0.0.0 대역의 IP를 사용한다고 소개하고 있으므로 AWS 가이드를 따라서 10.0 대역의 IP로 VPC를 생성하겠습니다. VPC 이름은 VPC-Lab(또는 본인이 원하는 이름)으로 입력하면 되고, 방금 할당 받은 Elastic IP를 _Elatic IP Allocation ID_ 에 지정해주세요!

| Subnet Name      | Availability Zone | IPv4 CIDR     |
| ---------------- | ----------------- | ------------- |
| Public subnet A  | a                 | 10.0.10.0/24  |
| Private subnet A | a                 | 10.0.100.0/24 |

![](https://kr-id-general.workshop.aws/images/network/gid-network-13.svg)

---

![](Screen_Shot_2020-10-01_at_15.25.16.png)

몇 분 정도 기다리면 Subnet과 NAT Gateway가 생성됐다는 알림을 확인할 수 있고, 이제 _Subnets_ 메뉴에서 다른 가용 영역에서 사용할 서브넷을 생성해야 합니다.

![](Screen_Shot_2020-10-01_at_15.28.08.png)
![](Screen_Shot_2020-10-01_at_15.28.39.png)

VPC는 아까 만든 VPC(VPC-Lab)을 선택한 채로 c 영역에 Public / Private 서브넷을 각각 추가하면 됩니다.

| Subnet Name      | Availability Zone | IPv4 CIDR     |
| ---------------- | ----------------- | ------------- |
| Public subnet C  | c                 | 10.0.20.0/24  |
| Private subnet C | c                 | 10.0.200.0/24 |

![](Screen_Shot_2020-10-01_at_15.29.39.png)

여기까지 문제 없이 따라왔다면 가용 영역 a, c에 각각 생성된 Public, Private 서브넷을 확인할 수 있습니다.

![](https://kr-id-general.workshop.aws/images/network/gid-network-34.svg)

---

![](Screen_Shot_2020-10-01_at_15.50.37.png)

하지만 우리가 직접 추가한 가용 영역 c에 해당하는 서브넷 영역은 Route Table에 연결되지 않았기 때문에 _Route Tables_ 메뉴에서 직접 등록해줘야 합니다.

![](Screen_Shot_2020-10-01_at_15.51.56.png)
![](Screen_Shot_2020-10-01_at_15.51.38.png)

Public Route Table을 선택하면 VPC를 생성할 때 같이 생성된 서브넷이 이미 추가된 상태이므로 **Edit subnet associations** 버튼을 눌러서 Public 영역에는 Public 서브넷을, 나머지 영역에는 Private 서브넷을 추가해줍니다.

![](Screen_Shot_2020-10-01_at_15.53.46.png)
![](Screen_Shot_2020-10-01_at_15.53.49.png)

아니면 Routes 영역에서 Target이 igw(Internet Gateway)로 향하는 쪽을 Public으로, nat(Network Address Translation)로 향하는 쪽을 Private으로 구분할 수도 있습니다.

실습이 끝난 후에는 모두 지울 예정이지만(...) 실제 서비스에 사용할 환경이라면 라우트를 연결하고 나서 이름도 알맞게 지어주는 게 향후 관리·확장에 있어서 더 용이하겠죠?

![](https://kr-id-general.workshop.aws/images/network/gid-network-01.svg)

---

여기까지가 앞으로 실습에서 사용할 네트워크 구성입니다. 어떤가요, 네트워크 구성은 생각보다 쉽지 않나요? (~~하지만 다음 편에서는 Security Group 설정의 늪에 빠질 예정입니다~~) 다음 편에서는 오늘 구성한 네트워크에 AWS의 메인 요리(?)라고 할 수 있는 EC2 인스턴스를 추가해보겠습니다.
