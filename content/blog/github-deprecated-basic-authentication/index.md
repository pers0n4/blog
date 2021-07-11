---
title: GitHub 기본 인증 지원 중단 예정 알림
date: 2021-07-12T01:38+09:00
category: Git
tags: [Git, GitHub]
---

> Basic authentication using a password to Git is deprecated and will soon no longer work. Visit <https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/> for more information around suggested workarounds and removal dates.

최근 Git 관련 발표를 진행하는 중 청중분으로부터 GitHub에 push할 때마다 위와 같은 경고 문구가 나타난다는 질문을 받았습니다. 제가 GitHub를 거의 매일 사용하는 편인데도 저런 경고가 나타난다는 상황은 처음 들어봐서 저도 한번 찾아봤는데요. 이미 많은 분이 블로그에 올려주셨던데 저도 소식을 전할 겸 간단하게 올려봅니다.

Git을 사용할 때마다 경고가 나타나는 문제의 요지는 **2021년 8월 13일부터 '비밀번호를 통한 인증'을 지원하지 않는다는 사실**입니다. 즉, Git CLI나 GitHub에 접근하는 기타 서비스 등에서 더는 패스워드로 인증을 진행할 수 없다는 뜻이 되겠네요. 패스워드를 통한 인증이 만료되면 Personal Access Token 또는 SSH Key를 통해서 인증을 진행해야 합니다.

저는 왜 이제껏 경고를 보지 못했나 했더니 2차 인증 등을 이유로 이미 토큰으로 인증을 진행하고 있거나, SSH 기반 인증을 사용하는 유저에게는 아무런 영향이 없어서 경고가 나타나지 않던 것이더라고요.

SSH를 설정하는 방법이나 토큰을 발급받는 방법도 소개해볼까 했는데, 이미 GitHub에 너무 정리가 잘 되어 있는 내용이라 링크로 대체하고 방법만 소개하는 선에서 짧게 마무리해보겠습니다. 🙂

1. SSH 인증
   1. [SSH 키 생성](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
   2. [SSH 키 등록](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
2. [액세스 토큰 인증](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

*[2차 인증]: 2FA, Two Factor Authentication
