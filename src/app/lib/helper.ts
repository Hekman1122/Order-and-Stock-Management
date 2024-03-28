type productAmount = {
  small: number;
  medium: number;
  large: number;
};

type rawDataType = {
  user: string;
  reason: string;
  products: {
    [key: string]: productAmount;
  };
};

type recordObject = {
  [key: string]: Partial<productAmount>;
};

//拆解品名
export function getProductData(str: string) {
  const strArray = str.split("_");
  return { productName: strArray[0], productSize: strArray[1] };
}

//將同一產品名建立成單一物件
export function getValue(formData: FormData) {
  const rawFormData: rawDataType = {
    user: formData.get("user") as string,
    reason: formData.get("reason") as string,
    products: {
      cheese: {
        small: Number.parseInt(formData.get("cheese-small") as string),
        medium: Number.parseInt(formData.get("cheese-medium") as string),
        large: Number.parseInt(formData.get("cheese-large") as string),
      },
      margaret: {
        small: Number.parseInt(formData.get("margaret-small") as string),
        medium: Number.parseInt(formData.get("margaret-medium") as string),
        large: Number.parseInt(formData.get("margaret-large") as string),
      },
      chicken: {
        small: Number.parseInt(formData.get("chicken-small") as string),
        medium: Number.parseInt(formData.get("chicken-medium") as string),
        large: Number.parseInt(formData.get("chicken-large") as string),
      },
      beef: {
        small: Number.parseInt(formData.get("beef-small") as string),
        medium: Number.parseInt(formData.get("beef-medium") as string),
        large: Number.parseInt(formData.get("beef-large") as string),
      },
      mexico: {
        small: Number.parseInt(formData.get("mexico-small") as string),
        medium: Number.parseInt(formData.get("mexico-medium") as string),
        large: Number.parseInt(formData.get("mexico-large") as string),
      },
      bbq: {
        small: Number.parseInt(formData.get("bbq-small") as string),
        medium: Number.parseInt(formData.get("bbq-medium") as string),
        large: Number.parseInt(formData.get("bbq-large") as string),
      },
      reuben: {
        small: Number.parseInt(formData.get("reuben-small") as string),
        medium: Number.parseInt(formData.get("reuben-medium") as string),
        large: Number.parseInt(formData.get("reuben-large") as string),
      },
      basil: {
        small: Number.parseInt(formData.get("basil-small") as string),
        medium: Number.parseInt(formData.get("basil-medium") as string),
        large: Number.parseInt(formData.get("basil-large") as string),
      },
      potato: {
        small: Number.parseInt(formData.get("potato-small") as string),
        medium: Number.parseInt(formData.get("potato-medium") as string),
        large: Number.parseInt(formData.get("potato-large") as string),
      },
    },
  };
  return rawFormData;
}

//移除數量為零的品項
export function getRidOfZeroes(obj: { [key: string]: Partial<productAmount> }) {
  const resultObject: recordObject = {};
  const outsideKey = Object.keys(obj);
  outsideKey.forEach((item) => {
    //item 為品名 如 cheese...
    const { small, medium, large } = obj[item];
    if (small !== 0) {
      if (resultObject[item]) {
        resultObject[item] = {
          ...resultObject[item],
          small: small,
        };
      } else {
        resultObject[item] = {
          small: small,
        };
      }
    }
    if (medium !== 0) {
      if (resultObject[item]) {
        resultObject[item] = {
          ...resultObject[item],
          medium: medium,
        };
      } else {
        resultObject[item] = {
          medium: medium,
        };
      }
    }
    if (large) {
      if (large !== 0) {
        if (resultObject[item]) {
          resultObject[item] = {
            ...resultObject[item],
            large: large,
          };
        } else {
          resultObject[item] = {
            large: large,
          };
        }
      }
    }

    return;
  });

  return resultObject;
}

//合併兩個物件
export function objectMerge(
  obj1: Partial<productAmount>,
  obj2: Partial<productAmount>
) {
  const resultObj: productAmount = {
    small: 0,
    medium: 0,
    large: 0,
  };
  // small
  if (obj2["small"]) {
    if (obj1["small"]) {
      resultObj["small"] = obj1["small"] + obj2["small"];
    } else {
      resultObj["small"] = obj2["small"];
    }
  } else {
    if (obj1["small"]) resultObj["small"] = obj1["small"];
  }

  //medium
  if (obj2["medium"]) {
    if (obj1["medium"]) {
      resultObj["medium"] = obj1["medium"] + obj2["medium"];
    } else {
      resultObj["medium"] = obj2["medium"];
    }
  } else {
    if (obj1["medium"]) resultObj["medium"] = obj1["medium"];
  }

  //large
  if (obj2["large"]) {
    if (obj1["large"]) {
      resultObj["large"] = obj1["large"] + obj2["large"];
    } else {
      resultObj["large"] = obj2["large"];
    }
  } else {
    if (obj1["large"]) resultObj["large"] = obj1["large"];
  }

  return resultObj;
}

type rawDataOrderType = {
  orderNumber: string;
  orderClient: string;
  products: {
    [key: string]: Partial<productAmount>;
  };
};

//將同一產品名建立成單一物件
export function getValueORder(formData: FormData) {
  const rawFormData: rawDataOrderType = {
    orderNumber: formData.get("orderNumber") as string,
    orderClient: formData.get("orderClient") as string,
    products: {
      cheese: {
        small: Number.parseInt(formData.get("cheese-small") as string),
        medium: Number.parseInt(formData.get("cheese-medium") as string),
      },
      margaret: {
        small: Number.parseInt(formData.get("margaret-small") as string),
        medium: Number.parseInt(formData.get("margaret-medium") as string),
      },
      chicken: {
        small: Number.parseInt(formData.get("chicken-small") as string),
        medium: Number.parseInt(formData.get("chicken-medium") as string),
      },
      beef: {
        small: Number.parseInt(formData.get("beef-small") as string),
        medium: Number.parseInt(formData.get("beef-medium") as string),
      },
      mexico: {
        small: Number.parseInt(formData.get("mexico-small") as string),
        medium: Number.parseInt(formData.get("mexico-medium") as string),
      },
      bbq: {
        small: Number.parseInt(formData.get("bbq-small") as string),
        medium: Number.parseInt(formData.get("bbq-medium") as string),
      },
      reuben: {
        small: Number.parseInt(formData.get("reuben-small") as string),
        medium: Number.parseInt(formData.get("reuben-medium") as string),
      },
      basil: {
        small: Number.parseInt(formData.get("basil-small") as string),
        medium: Number.parseInt(formData.get("basil-medium") as string),
      },
      potato: {
        small: Number.parseInt(formData.get("potato-small") as string),
        medium: Number.parseInt(formData.get("potato-medium") as string),
      },
    },
  };
  return rawFormData;
}

enum ProductName {
  cheese = "經典原味起司",
  margaret = "義式瑪格麗特",
  chicken = "地中海烤雞",
  beef = "費城牛肉",
  mexico = "墨西哥費城牛肉",
  bbq = "BBQ手撕豬肉",
  basil = "青醬雞肉",
  potato = "馬鈴薯蛋沙拉",
  reuben = "魯本牛肉",
}

type OrderObject = {
  name: string;
  small: number;
  medium: number;
};

//將字串資料轉換成物件陣列格式
export function stringToArray(str: string) {
  const obj = JSON.parse(str);
  const keys = Object.keys(obj);
  const resultArray: OrderObject[] = [];
  keys.forEach((key) => {
    let name: string = "";
    if (key === "cheese") name = ProductName.cheese;
    if (key === "margaret") name = ProductName.margaret;
    if (key === "chicken") name = ProductName.chicken;
    if (key === "beef") name = ProductName.beef;
    if (key === "mexico") name = ProductName.mexico;
    if (key === "bbq") name = ProductName.bbq;
    if (key === "basil") name = ProductName.basil;
    if (key === "potato") name = ProductName.potato;
    if (key === "reuben") name = ProductName.reuben;

    resultArray.push({
      name,
      small: obj[key].small ? obj[key].small : 0,
      medium: obj[key].medium ? obj[key].medium : 0,
    });
  });
  return resultArray;
}

//訂單物件合併(數量相減)

type OrderType = {
  small: number;
  medium: number;
};

//合併兩個訂單物件
export function orderMerge(
  originalOrderAmount: Partial<OrderType>,
  orderAmountChange: Partial<OrderType>
) {
  const resultObj: OrderType = {
    small: 0,
    medium: 0,
  };
  // small
  if (orderAmountChange["small"]) {
    if (originalOrderAmount["small"]) {
      resultObj["small"] =
        originalOrderAmount["small"] - orderAmountChange["small"];
    }
  } else {
    if (originalOrderAmount["small"])
      resultObj["small"] = originalOrderAmount["small"];
  }

  //medium
  if (orderAmountChange["medium"]) {
    if (originalOrderAmount["medium"]) {
      resultObj["medium"] =
        originalOrderAmount["medium"] - orderAmountChange["medium"];
    }
  } else {
    if (originalOrderAmount["medium"])
      resultObj["medium"] = originalOrderAmount["medium"];
  }

  return resultObj;
}

//合併庫存物件和訂單物件
export function stockOrderMerge(
  originalOrderAmount: productAmount,
  orderAmountChange: Partial<OrderType>
) {
  const resultObj: productAmount = {
    small: 0,
    medium: 0,
    large: 0,
  };
  // small
  if (orderAmountChange["small"]) {
    if (originalOrderAmount["small"]) {
      resultObj["small"] =
        originalOrderAmount["small"] - orderAmountChange["small"];
    }
  } else {
    if (originalOrderAmount["small"])
      resultObj["small"] = originalOrderAmount["small"];
  }

  //medium
  if (orderAmountChange["medium"]) {
    if (originalOrderAmount["medium"]) {
      resultObj["medium"] =
        originalOrderAmount["medium"] - orderAmountChange["medium"];
    }
  } else {
    if (originalOrderAmount["medium"])
      resultObj["medium"] = originalOrderAmount["medium"];
  }
  //large
  resultObj["large"] = originalOrderAmount["large"];
  return resultObj;
}
