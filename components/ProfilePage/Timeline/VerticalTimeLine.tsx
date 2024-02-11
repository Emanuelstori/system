"use client";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot, { TimelineDotProps } from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegCheckCircle, FaRegPauseCircle } from "react-icons/fa";
import { FaRegCircleUp } from "react-icons/fa6";
import { RelatoryType } from "@prisma/client";
import { format } from "date-fns";

interface MyRelatoryType {
  title: string;
  createdAt: Date;
  relatoryType: RelatoryType;
  accepted: boolean;
  description: string | null;
  author: {
    user: {
      nick: string;
    };
  };
}

const titles: TitlesType = {
  USER_ACCESS: {
    icon: <IoPersonAddSharp size={25} />,
    type: "info",
    typeSuccess: "success",
  },
  USER_REINTEGRATION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  USER_PROMOTION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  USER_RELEGATION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "error",
  },
  USER_DISCONNEXION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "error",
    typeSuccess: "error",
  },
  USER_TAG: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  USER_CHANGE_ACCOUNT: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  CLASS_APPLICATION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  ROLE_CREATION: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  USER_CONTRACT: {
    icon: <IoPersonAddSharp size={25} />,
    type: "warning",
    typeSuccess: "success",
  },
  USER_RETIREE: {
    icon: <IoPersonAddSharp size={25} />,
    type: "info",
    typeSuccess: "info",
  },
  USER_LICENSE: {
    icon: <IoPersonAddSharp size={25} />,
    type: "info",
    typeSuccess: "info",
  },
};

export default function verticalTimeLine({
  relatories,
  userData,
}: {
  relatories: MyRelatoryType[] | undefined;
  userData: any;
}) {
  return (
    <div className="flex max-w-full">
      <Timeline position="left">
        {relatories?.map((item, index) => (
          <>
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
              >
                {format(item.createdAt.toString(), "dd/MM/yy HH:mm")}
                <br></br> publicado por: {item.author.user.nick}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector
                  sx={
                    item.accepted
                      ? {
                          bgcolor: `${
                            titles[item.relatoryType].typeSuccess
                          }.main`,
                        }
                      : { bgcolor: `${titles[item.relatoryType].type}.main` }
                  }
                />
                <TimelineDot
                  color={
                    item.accepted
                      ? titles[item.relatoryType].typeSuccess
                      : titles[item.relatoryType].type
                  }
                >
                  {titles[item.relatoryType].icon}
                </TimelineDot>
                <TimelineConnector
                  sx={
                    item.accepted
                      ? {
                          bgcolor: `${
                            titles[item.relatoryType].typeSuccess
                          }.main`,
                        }
                      : { bgcolor: `${titles[item.relatoryType].type}.main` }
                  }
                />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography
                  align="left"
                  noWrap={true}
                  variant="h6"
                  component="span"
                >
                  {userData.nick} {item.title}
                </Typography>
                <Typography align="left" className="!text-justify">
                  {item.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </>
        ))}
      </Timeline>
    </div>
  );
}

function example() {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
        >
          xx/xx/xx xx:xx
          <br></br> publicado por: Sr.Rennaan123
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="info">
            <FaRegPauseCircle size={25} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "info.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Licença
          </Typography>
          <Typography>
            Emanuelstor estará ausente na RHC por 14 dias, conforme solicitado
            pelo mesmo.
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
          xx/xx/xx xx:xx
          <br></br> publicado por: Sr.Rennaan123
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "info.main" }} />
          <TimelineDot color="success">
            <FaRegCircleUp size={25} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "green" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Promoção Cabo
          </Typography>
          <Typography>
            Agente estava fazendo um otimo trabalho na recepção alistando
            recrutas. Promoção merecida.
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
          xx/xx/xx xx:xx
          <br></br> publicado por: Sr.Rennaan123
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "green" }} />
          <TimelineDot color="success">
            <FaRegCheckCircle size={25} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "green" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Aprovado CFA: Curso De Formação De Agentes
          </Typography>
          <Typography>Experiente, sabe o que fazer na RHC</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2">
          xx/xx/xx xx:xx
          <br></br> publicado por: Sr.Rennaan123
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "green" }} />
          <TimelineDot color="secondary">
            <IoPersonAddSharp size={25} />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "green" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Se cadastrou no System!
          </Typography>
          <Typography>
            Foi nessa data especial que emanuelstor se cadastrou em nosso
            System!
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

interface TitlesType {
  [key: string]: {
    icon: React.JSX.Element;
    type:
      | "info"
      | "error"
      | "inherit"
      | "warning"
      | "success"
      | "primary"
      | "secondary"
      | "grey";
    typeSuccess:
      | "info"
      | "error"
      | "inherit"
      | "warning"
      | "success"
      | "primary"
      | "secondary"
      | "grey";
  };
}
